import { message } from 'antd';
import _copy from 'copy-to-clipboard';

export function copy(text, t) {
  message.success(t('copySuccess'));
  return _copy(text);
}
