/* eslint-disable no-use-before-define */

import { parseIdUri } from '../../util/common';

function renderElement(el: Element): string {
  switch (el.tagName) {
    case 'MX-REPLY':
      return '';

    case 'P':
      return `${renderChildren(el)}\n\n`;
    case 'BR':
      return '\n';

    case 'H1':
      return `# ${renderChildren(el)}\n\n`;
    case 'H2':
      return `## ${renderChildren(el)}\n\n`;
    case 'H3':
      return `### ${renderChildren(el)}\n\n`;
    case 'H4':
      return `#### ${renderChildren(el)}\n\n`;
    case 'H5':
      return `##### ${renderChildren(el)}\n\n`;
    case 'H6':
      return `###### ${renderChildren(el)}\n\n`;

    case 'HR':
      return '---\n\n';

    case 'PRE': {
      let lang = '';
      if (el.firstElementChild) {
        Array.from(el.firstElementChild.classList).some((c) => {
          const langPrefix = 'language-';
          if (c.startsWith(langPrefix)) {
            lang = c.slice(langPrefix.length);
            return true;
          }
          return false;
        });
      }
      return `\`\`\`${lang}\n${(el as HTMLPreElement).innerText}\n\`\`\``;
    }

    case 'BLOCKQUOTE': {
      const content = renderChildren(el)
        .trim()
        .split('\n')
        .map((l) => `> ${l}`)
        .join('\n');
      return `${content}\n\n`;
    }

    case 'UL':
      return Array.from(el.children)
        .map((n) => `* ${renderElement(n).replace(/\n/g, '\n  ')}`)
        .join('\n');
    case 'OL': {
      const start = Number(el.getAttribute('start') || 1);
      return Array.from(el.children)
        .map((n, i) => {
          const prefix = `${start + i}. `;
          return `${prefix}${renderElement(n).replace(/\n/g, `\n${' '.repeat(prefix.length)}`)}`;
        })
        .join('\n');
    }

    case 'TABLE':
      // TODO
      return '<table>';

    case 'A': {
      const href = el.getAttribute('href') || '';
      const content = renderChildren(el);

      if (parseIdUri(href)) {
        return content;
      }

      const title = el.getAttribute('title');
      if (title) {
        return `[${content}](${href} "${title}")`;
      }
      if (content !== href) {
        return `[${content}](${href})`;
      }
      return content;
    }

    case 'IMG': {
      let title = el.getAttribute('title') || '';

      if (el.hasAttribute('data-mx-emoticon')) {
        if (!title.endsWith(':') || !title.startsWith(':')) {
          title = `:${title}:`;
        }
        return title;
      }

      const src = el.getAttribute('src') || '';
      const alt = el.getAttribute('alt') || '';

      if (title) {
        return `![${alt}](${src} "${title}")`;
      }
      return `![${alt}](${src})`;
    }

    case 'EM':
    case 'I':
      return `_${renderChildren(el)}_`;
    case 'STRONG':
    case 'B':
      return `**${renderChildren(el)}**`;
    case 'U':
      return `__${renderChildren(el)}__`;
    case 'DEL':
    case 'STRIKE':
      return `~~${renderChildren(el)}~~`;
    case 'CODE':
      return `\`${el.innerText}\``;

    case 'DIV': {
      const maths = el.getAttribute('data-mx-maths');
      if (maths) {
        return maths.includes('\n') ? `$$\n${maths}\n$$\n` : `$$${maths}$$\n`;
      }

      return renderChildren(el);
    }

    case 'SPAN': {
      const reason = el.getAttribute('data-mx-spoiler');
      if (reason !== null) {
        return reason ? `<spoiler: ${reason}>` : '<spoiler>';
      }

      const maths = el.getAttribute('data-mx-maths');
      if (maths) {
        return `$${maths}$`;
      }

      return renderChildren(el);
    }

    default:
      return renderChildren(el);
  }
}

function renderNode(n: Node): string {
  switch (n.nodeType) {
    case Node.TEXT_NODE:
      return n.textContent || '';
    case Node.ELEMENT_NODE:
      return renderElement(n as HTMLElement);
    default:
      return '';
  }
}

function renderChildren(n: Node): string {
  let content = '';
  for (let child = n.firstChild; child !== null; child = child.nextSibling) {
    content += renderNode(child);
  }
  return content;
}

export function plainContent(content: any): string {
  if (content.format !== 'org.matrix.custom.html') {
    return content.body;
  }

  const el = document.createElement('template');
  el.innerHTML = content.formatted_body;
  return renderChildren(el.content);
}
