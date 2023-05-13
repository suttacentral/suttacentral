export function getURLParam(name) {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(name);
  } catch (e) {
    return '';
  }
}

export function isMobileBrowser() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgen);
}
