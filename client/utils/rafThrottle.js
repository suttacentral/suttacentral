const rafThrottle = callback => {
  let ticking = false;

  return function () {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

export default rafThrottle
