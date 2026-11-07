/** UIAutomator may include clipped nodes and a background window under a modal. */
export function visibleTarget(xml, label) {
  const candidates = [];
  const ancestors = [];
  const boundsOf = (node) => {
    const bounds = node.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
    return bounds?.slice(1).map(Number);
  };
  const usable = (node) => {
    const bounds = boundsOf(node);
    return (
      bounds &&
      !node.includes('enabled="false"') &&
      bounds[2] - bounds[0] >= 20 &&
      bounds[3] - bounds[1] >= 60
    );
  };
  for (const token of xml.match(/<\/?node\b[^>]*>/g) ?? []) {
    if (token.startsWith('</node')) {
      ancestors.pop();
      continue;
    }
    const node = token;
    const contentDescription = node.match(/content-desc="([^"]*)"/)?.[1];
    // Android appends accessibilityValue.text to an adjustable control's spoken label.
    const description =
      contentDescription === label ||
      (node.includes('class="android.widget.SeekBar"') &&
        contentDescription?.startsWith(`${label}, `) &&
        /^\d{1,3}%$/.test(contentDescription.slice(label.length + 2)));
    const labelBounds = boundsOf(node);
    if (
      (description || node.includes(`text="${label}"`)) &&
      labelBounds &&
      labelBounds[2] > labelBounds[0] &&
      labelBounds[3] > labelBounds[1] &&
      ![node, ...ancestors].some((entry) => entry.includes('enabled="false"'))
    ) {
      const target = usable(node)
        ? node
        : [...ancestors].reverse().find((parent) => {
            const bounds = boundsOf(parent);
            return (
              parent.includes('clickable="true"') &&
              usable(parent) &&
              labelBounds[0] >= bounds[0] &&
              labelBounds[1] >= bounds[1] &&
              labelBounds[2] <= bounds[2] &&
              labelBounds[3] <= bounds[3]
            );
          });
      if (target) {
        const [left, top, right, bottom] = boundsOf(target);
        candidates.push({
          node: target,
          description,
          x: Math.floor((left + right) / 2),
          y: Math.floor((top + bottom) / 2),
        });
      }
    }
    if (!node.endsWith('/>')) ancestors.push(node);
  }
  return candidates.filter((item) => item.description).at(-1) ?? candidates.at(-1);
}
