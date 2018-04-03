const throttle = (fn, wait) => {
  let lastTime = + new Date(), timer, inThrottle;

  return function () {
    const context = this;
    const args = arguments;

    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, wait - (Date.now() - lastTime));
    }
  }
}

export default throttle
