// A list of text inputs where we should ignore keyboard shortcuts
const TEXT_INPUT_SHADOW_ROOTS = [
  'SC-NAVIGATION-LINDEN-LEAVES',
  'SC-PAGE-SEARCH',
  'SC-STATIC-DONATE-NOW',
];

export function ignorableKeydownEvent(event) {
  if (TEXT_INPUT_SHADOW_ROOTS.indexOf(event.target.tagName) >= 0) return true;
  if (event.ctrlKey || event.metaKey || event.altKey) return true;
  return false;
}
