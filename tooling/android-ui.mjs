/** UIAutomator may include clipped nodes and a background window under a modal. */
export function visibleTarget(xml, label) {
  const candidates = (xml.match(/<node\b[^>]+>/g) ?? []).flatMap((node) => {
    const contentDescription = node.match(/content-desc="([^"]*)"/)?.[1];
    // Android appends accessibilityValue.text to an adjustable control's spoken label.
    const description =
      contentDescription === label ||
      (node.includes('class="android.widget.SeekBar"') &&
        contentDescription?.startsWith(`${label}, `) &&
        /^\d{1,3}%$/.test(contentDescription.slice(label.length + 2)));
    if (!description && !node.includes(`text="${label}"`)) return [];
    const bounds = node.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
    if (!bounds || node.includes('enabled="false"')) return [];
    const [left, top, right, bottom] = bounds.slice(1).map(Number);
    if (right - left < 20 || bottom - top < 60) return [];
    return [
      { node, description, x: Math.floor((left + right) / 2), y: Math.floor((top + bottom) / 2) },
    ];
  });
  return candidates.filter((item) => item.description).at(-1) ?? candidates.at(-1);
}
