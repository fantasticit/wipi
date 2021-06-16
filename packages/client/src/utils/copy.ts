import _copy from 'copy-to-clipboard';
import { message } from 'antd';

export function copy(text, t) {
  message.success(t('copySuccess'));
  return _copy(text);
}
