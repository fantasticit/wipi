// 标签颜色
export const TAG_COLORS = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  '#2db7f5',
  '#87d068',
  '#108ee9',
];
export const getOneTagColor = (idx?: number) => {
  if (idx && idx < TAG_COLORS.length) {
    return TAG_COLORS[idx];
  }

  return TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];
};
