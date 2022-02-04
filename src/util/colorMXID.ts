// https://github.com/cloudrac3r/cadencegq/blob/master/pug/mxid.pug

function hashCode(str: string): number {
  let hash = 0;
  let i;
  let chr;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i += 1) {
    chr = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function colorMXID(userId: string): string {
  const colorNumber = hashCode(userId) % 8;
  return `var(--mx-uc-${colorNumber + 1})`;
}
