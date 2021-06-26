export const groupBy = function (data, condition) {
  if (!condition || !Array.isArray(data)) {
    return data;
  }
  const result = Object.create(null);
  let key = null;

  data.forEach((item, i, arr) => {
    key = condition(item, i, arr);
    if (key === null || key === undefined) {
      return;
    }
    if (result[key]) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
  });

  return result;
};

export const formatFileSize = (size) => {
  if (size < 1024) {
    return size + ' Byte';
  }
  if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  }
  return (size / 1024 / 1024).toFixed(2) + ' MB';
};

export function debounce(func, wait, immediate = false) {
  let timeout;

  const debounced = function () {
    const context = this; // eslint-disable-line @typescript-eslint/no-this-alias
    const args = arguments; // eslint-disable-line prefer-rest-params
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

export function resolveUrl(baseURL, relativeURL) {
  if (!baseURL) {
    baseURL = '/';
  }

  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

export const isOdd = (v) => v % 2 !== 0;

export const scrollToBottom = (el: HTMLElement) => {
  const currentScrollTop = el.scrollTop;
  const clientHeight = el.offsetHeight;
  const scrollHeight = el.scrollHeight;

  el.scrollTo(0, currentScrollTop + (scrollHeight - currentScrollTop - clientHeight));
};
