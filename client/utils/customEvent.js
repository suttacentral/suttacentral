export const dispatchCustomEvent = (from, name, payload) => {
  from.dispatchEvent(
    new CustomEvent(name, {
      detail: payload,
      bubbles: true,
      composed: true,
    })
  );
};
