import { default as Router } from 'next/router';

const whitePaths = ['login', 'register'];

export const toLogin = () => {
  const { pathname, asPath } = Router;

  if (whitePaths.some((path) => pathname.includes(path))) {
    return;
  }

  if (whitePaths.some((path) => asPath.includes(path))) {
    Router.push(`/login`);
  } else {
    Router.push(`/login?redirect=${asPath}`);
  }
};
