param(
    [int]$DurationSeconds = 600,
    [int]$IntervalSeconds = 5
)
$ErrorActionPreference = 'Stop'
if ($DurationSeconds -lt 10 -or $IntervalSeconds -lt 1) { throw 'Use at least ten seconds and a positive sample interval.' }
$projectRoot = Split-Path -Parent $PSScriptRoot
$applicationPath = Join-Path $projectRoot 'target/release/relay-link-desktop.exe'
$outputPath = Join-Path $projectRoot 'artifacts-local/desktop-release-resource-sample.json'
if (-not (Test-Path -LiteralPath $applicationPath)) { throw 'Build the embedded release executable first.' }

function Get-AppProcesses([int]$RootId) {
    $inventory = @(Get-CimInstance Win32_Process | Select-Object ProcessId, ParentProcessId)
    $included = [System.Collections.Generic.HashSet[int]]::new()
    [void]$included.Add($RootId)
    do {
        $changed = $false
        foreach ($entry in $inventory) {
            if ($included.Contains([int]$entry.ParentProcessId) -and $included.Add([int]$entry.ProcessId)) { $changed = $true }
        }
    } while ($changed)
    @(Get-Process -Id @($included) -ErrorAction SilentlyContinue)
}

$application = Start-Process -FilePath $applicationPath -PassThru
try {
    Start-Sleep -Seconds 20
    $baseline = @{}
    foreach ($item in (Get-AppProcesses $application.Id)) { $baseline[$item.Id] = $item.TotalProcessorTime.TotalSeconds }
    $timer = [System.Diagnostics.Stopwatch]::StartNew()
    $samples = [System.Collections.Generic.List[object]]::new()
    while ($timer.Elapsed.TotalSeconds -lt $DurationSeconds) {
        Start-Sleep -Seconds $IntervalSeconds
        $application.Refresh()
        if ($application.HasExited) { throw 'Application exited during the resource sample.' }
        $processes = @(Get-AppProcesses $application.Id)
        $cpuSeconds = 0.0
        foreach ($item in $processes) {
            $initial = if ($baseline.ContainsKey($item.Id)) { $baseline[$item.Id] } else { 0.0 }
            $cpuSeconds += [Math]::Max(0, $item.TotalProcessorTime.TotalSeconds - $initial)
        }
        $samples.Add([pscustomobject]@{
            ElapsedSeconds = $timer.Elapsed.TotalSeconds
            CpuSeconds = $cpuSeconds
            WorkingSetMiB = ($processes | Measure-Object WorkingSet64 -Sum).Sum / 1MB
            PrivateMiB = ($processes | Measure-Object PrivateMemorySize64 -Sum).Sum / 1MB
            ProcessCount = $processes.Count
        })
    }
    $last = $samples[$samples.Count - 1]
    $result = [ordered]@{
        Scope = 'Available Windows host; release build; open idle window; app/WebView descendants only; not tray, low-end, active-control or physical-device acceptance'
        BinarySha256 = (Get-FileHash -LiteralPath $applicationPath -Algorithm SHA256).Hash.ToLowerInvariant()
        WarmupSeconds = 20
        DurationSeconds = $last.ElapsedSeconds
        SampleCount = $samples.Count
        LogicalProcessors = [Environment]::ProcessorCount
        TotalSystemCpuPercent = 100 * $last.CpuSeconds / $last.ElapsedSeconds / [Environment]::ProcessorCount
        AveragePrivateMiB = ($samples | Measure-Object PrivateMiB -Average).Average
        PeakPrivateMiB = ($samples | Measure-Object PrivateMiB -Maximum).Maximum
        AverageWorkingSetMiB = ($samples | Measure-Object WorkingSetMiB -Average).Average
        PeakWorkingSetMiB = ($samples | Measure-Object WorkingSetMiB -Maximum).Maximum
        FinalProcessCount = $last.ProcessCount
        Limitations = 'CPU of children that exit during the interval can be undercounted; working-set sums can double-count shared pages. GPU, startup, network, battery and low-end compatibility not measured.'
        Samples = @($samples)
    }
    $result | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $outputPath -Encoding utf8
    $result.Remove('Samples')
    $result | ConvertTo-Json -Depth 3
} finally {
    $application.Refresh()
    if (-not $application.HasExited) { [void]$application.CloseMainWindow() }
}
