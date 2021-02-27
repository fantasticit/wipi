import React from 'react';
import { NextPage } from 'next';
import { PageProvider } from '@/providers/page';
import { PageEditor } from '@/components/PageEditor';

interface IProps {
  id: string | number;
  page: IPage;
}

const Editor: NextPage<IProps> = ({ id, page }) => {
  return <PageEditor id={id} page={page} />;
};

Editor.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const page = await PageProvider.getPage(id);
  return { id, page } as { id: string | number; page: IPage };
};

export default Editor;
