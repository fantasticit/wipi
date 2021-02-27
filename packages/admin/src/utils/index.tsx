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
