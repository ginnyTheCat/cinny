/* eslint-disable import/prefer-default-export */
import linkifyHtml from 'linkifyjs/html';
import parse from 'html-react-parser';
import twemoji, { ParseObject } from 'twemoji';
import { sanitizeText } from './sanitize';

/**
 * @param {string} text - text to twemojify
 * @param {object|undefined} opts - options for tweomoji.parse
 * @param {boolean} [linkify=false] - convert links to html tags (default: false)
 * @param {boolean} [sanitize=true] - sanitize html text (default: true)
 * @returns React component
 */
export function twemojify(
  text: string,
  opts?: Partial<ParseObject>,
  linkify: boolean = false,
  sanitize: boolean = true,
) {
  if (typeof text !== 'string') return text;
  let content = text;

  if (sanitize) {
    content = sanitizeText(content);
  }
  content = twemoji.parse(content, opts);
  if (linkify) {
    content = linkifyHtml(content, {
      target: '_blank',
      rel: 'noreferrer noopener',
    });
  }
  return parse(content);
}
