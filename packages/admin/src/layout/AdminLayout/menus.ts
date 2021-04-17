export type IMenuItem = {
  icon?: string;
  title?: string;
  label: string;
  path: string;
  ignore?: boolean;
  children?: Array<IMenuItem>;
};

export const nestMenus: Array<IMenuItem> = [
  {
    label: '工作台',
    title: '工作台',
    path: '/',
    children: [
      {
        label: '评论管理',
        title: '评论管理',
        path: '/comment',
      },
      {
        label: '邮件管理',
        title: '邮件管理',
        path: '/mail',
      },
      {
        label: '文件管理',
        title: '文件管理',
        path: '/file',
      },

      {
        label: '搜索记录',
        title: '搜索记录',
        path: '/search',
      },

      {
        label: '访问统计',
        title: '访问统计',
        path: '/view',
      },

      {
        label: '个人中心',
        title: '个人中心',
        path: '/ownspace',
        ignore: true,
      },
      {
        label: '用户管理',
        title: '用户管理',
        path: '/user',
      },

      {
        label: '系统设置',
        title: '系统设置',
        path: '/setting',
      },
    ],
  },
  {
    label: '文章管理',
    title: '文章管理',
    path: '/article',
    children: [
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
        label: '分类管理',
        title: '分类管理',
        path: '/article/category',
      },
      {
        label: '标签管理',
        title: '标签管理',
        path: '/article/tags',
      },
    ],
  },
  {
    label: '页面管理',
    title: '页面管理',
    path: '/page',
    children: [
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
    ],
  },
  {
    label: '知识笔记',
    title: '知识笔记',
    path: '/knowledge',
  },
];

const menus = nestMenus.reduce((a, c) => {
  return [...a, c, ...(c.children || [])];
}, []);

export const findActiveMenu = (pathname): [IMenuItem | null, IMenuItem[]] => {
  const idx = menus.findIndex((menu) => menu.path === pathname);
  if (idx < 0) {
    return [null, []];
  }
  const activeMenu = menus[idx];
  const breadcrumbs =
    idx > 1
      ? [
          menus.slice(0, 1)[0],
          ...menus.slice(1, idx).filter((menu) => {
            return activeMenu.path.includes(menu.path);
          }),
          activeMenu,
        ]
      : [menus.slice(0, 1)[0]];

  return [activeMenu, breadcrumbs];
};

export const findNestMenuChildren = (pathname): Array<IMenuItem> => {
  const idx = nestMenus.findIndex((menu) => menu.path === pathname);
  let ret = [];

  if (idx < 0) {
    for (const menu of nestMenus) {
      const submenus = menu.children || [];
      const idx = submenus.findIndex((menu) => menu.path === pathname);
      if (idx > -1) {
        ret = submenus;
        break;
      }
    }
  } else {
    ret = nestMenus[idx].children || [];
  }

  return ret.filter((m) => !m.ignore);
};
