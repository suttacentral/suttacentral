// eslint-disable-next-line import/prefer-default-export
export function getURLParam(url, name) {
  try {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = url.split('?')[1].match(reg);
    if (r != null) {
      return r[2];
    }
    return '';
  } catch (e) {
    return '';
  }
}
