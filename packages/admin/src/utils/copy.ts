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
