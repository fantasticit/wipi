const colors = ['#52c41a', '#f5222d', '#1890ff', '#faad14', '#ff0064', '#722ed1'];

export const getRandomColor = (() => {
  const cache = {};
  return (key): string => {
    if (!cache[key]) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      cache[key] = color;
      return color;
    }
    return cache[key];
  };
})();

export function throttle(fn, threshhold) {
  let last;
  let timer;
  threshhold || (threshhold = 250);

  return function () {
    const context = this; // eslint-disable-line @typescript-eslint/no-this-alias
    const args = arguments; // eslint-disable-line prefer-rest-params
    const now = +new Date();

    if (last && now < last + threshhold) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export const isOdd = (v) => v % 2 !== 0;

export function elementInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}
export function getDocumentScrollTop() {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    window.scrollY ||
    document.body.scrollTop
  );
}

export function download({ name, url }) {
  const eleLink = document.createElement('a');
  eleLink.download = name;
  eleLink.style.display = 'none';
  eleLink.href = url;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
