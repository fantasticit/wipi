import React, { useRef, useEffect } from 'react';
import hljs from 'highlight.js';
import { copy } from '@/utils/copy';
import './index.module.scss';

export const MarkdownReader = ({ content }) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!content) {
      return;
    }
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

    const callbacks = [];

    setTimeout(() => {
      const blocks = ref.current.querySelectorAll('pre code');
      blocks.forEach((block: HTMLElement) => {
        const span = document.createElement('span');
        span.classList.add('copy-code-btn');
        span.innerText = '复制';
        span.onclick = () => copy(block.innerText);
        block.parentNode.insertBefore(span, block);

        callbacks.push(() => {
          block.parentNode.removeChild(span);
        });

        hljs.highlightBlock(block);
      });
    }, 0);

    // eslint-disable-next-line consistent-return
    return () => {
      callbacks.forEach((cb) => cb());
    };
  }, [content]);

  return <div ref={ref} className={'markdown'}></div>;
};
