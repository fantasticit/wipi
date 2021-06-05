import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import { Copy } from '@/components/Copy';

export const MarkdownReader = ({ content }) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const el = ref.current;
    const range = document.createRange();
    const slot = range.createContextualFragment(content);
    el.innerHTML = '';
    el.appendChild(slot);
  }, [content]);

  // 高亮
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setTimeout(() => {
      const blocks = ref.current.querySelectorAll('pre code');
      blocks.forEach((block: HTMLElement) => {
        const span = document.createElement('span');
        ReactDOM.render(<Copy text={block.innerText} />, span);
        block.parentNode.insertBefore(span, block);
        hljs.highlightBlock(block);
      });
    }, 0);
  }, [content]);

  return <div ref={ref} className={'markdown'}></div>;
};
