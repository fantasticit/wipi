export const menus = [
  {
    icon: 'dashboard',
    label: '工作台',
    title: '工作台',
    path: '/',
  },
  {
    divider: true,
  },
  {
    icon: 'form',
    label: '所有文章',
    title: '所有文章',
    path: '/article',
  },
  {
    label: '新建文章',
    path: '/article/editor',
    ignore: true,
  },
  {
    label: '编辑文章',
    path: '/article/editor/[id]',
    ignore: true,
  },
  {
    icon: 'copy',
    label: '分类管理',
    title: '分类管理',
    path: '/article/category',
  },
  {
    icon: 'tag',
    label: '标签管理',
    title: '标签管理',
    path: '/article/tags',
  },
  {
    divider: true,
  },
  {
    icon: 'snippets',
    label: '所有页面',
    title: '所有页面',
    path: '/page',
  },
  {
    label: '新建页面',
    path: '/page/editor',
    ignore: true,
  },
  {
    label: '编辑页面',
    path: '/page/editor/[id]',
    ignore: true,
  },
  {
    divider: true,
  },
  {
    icon: 'message',
    label: '评论管理',
    title: '评论管理',
    path: '/comment',
  },
  {
    icon: 'mail',
    label: '邮件管理',
    title: '邮件管理',
    path: '/mail',
  },
  {
    icon: 'folder-open',
    label: '文件管理',
    title: '文件管理',
    path: '/file',
  },
  {
    divider: true,
  },
  {
    icon: 'search',
    label: '搜索记录',
    title: '搜索记录',
    path: '/search',
  },

  {
    icon: 'project',
    label: '访问统计',
    title: '访问统计',
    path: '/view',
  },
  {
    divider: true,
  },
  {
    label: '个人中心',
    title: '个人中心',
    icon: 'user',
    path: '/ownspace',
    ignore: true,
  },
  {
    icon: 'user',
    label: '用户管理',
    title: '用户管理',
    path: '/user',
  },

  {
    icon: 'setting',
    label: '系统设置',
    title: '系统设置',
    path: '/setting',
  },
];
