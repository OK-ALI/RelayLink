#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn foundation_status() -> relay_core::FoundationState {
    relay_core::foundation_status()
}

// Harmless enrolled-but-ungranted command: actual webview smoke must observe ACL rejection.
#[tauri::command]
fn boundary_probe() -> &'static str {
    "unexpected authorization"
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![foundation_status, boundary_probe])
        .run(tauri::generate_context!())
        .expect("Relay Link foundation failed to start");
}
