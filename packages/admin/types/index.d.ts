interface IUser {
  name: string;
  avatar: string;
  email: string;
  token: string;
}

interface IFile {
  id: string;
  originalname: string;
  filename: string;
  type: string;
  size: number;
  url: string;
  createAt: string;
}

interface IArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags?: [any];
  cover?: string;
  toc: string;
  views: number;
  category: any;
  status: string;
  password?: string; // 访问密码
  needPassword: boolean;
  isRecommended?: boolean;
  isCommentable?: boolean; // 是否可评论
  createAt: string;
  updateAt: string;
  publishAt: string;
}

interface ITag {
  id: string;
  label: string;
  value: string;
}

interface ICategory {
  id: string;
  label: string;
  value: string;
}

interface IPage {
  id: string;
  name: string;
  path: string;
  order: number;
  cover?: string;
  content: string;
  toc: string;
  status: string;
  views: number;
  createAt: string;
  publishAt: string;
}

interface IComment {
  id: string;
  name: string;
  email: string;
  content: string;
  html: string;
  pass: boolean;
  createAt: string;
  userAgent: string;
  article?: IArticle;
  parentCommentId: string;
  hostId: string;
  isHostInPage: boolean;
  replyUserName?: string;
  replyUserEmail?: string;
  children?: [IComment];
}

interface IView {
  id: string;
  ip: string;
  userAgent: string;
  url: string;
  count: number;
  createAt: string;
  updateAt: string;
}

interface IMail {
  id: string;
  from: string;
  to: string;
  subject: number;
  text: string;
  html: string;
  createAt: string;
}

interface ISearch {
  id: string;
  type: string;
  keyword: string;
  count: number;
  createAt: string;
}
