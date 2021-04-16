import { message } from 'antd';

export const copy = (value) => {
  const textarea: HTMLTextAreaElement = document.createElement('textarea');
  textarea.id = 't';
  textarea.style.height = '0';
  document.body.appendChild(textarea);
  textarea.value = value;
  const selector: HTMLTextAreaElement = document.querySelector('#t');
  selector.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  message.success('内容已复制到剪切板');
};

export const groupBy = function (data, condition) {
  if (!condition || !Array.isArray(data)) {
    return data;
  }
  const result = Object.create(null);
  let key = null;

  data.forEach((item, i, arr) => {
    key = condition(item, i, arr);
    // eslint-disable-next-line eqeqeq
    if (key == null) {
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

export function resolveUrl(...parts) {
  const separator = '/';
  const replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}
