const parseUserId = (str: string) => {
  if ( /^\/[\w-]*$/.test(str) ) return str.slice(1);
  return '';
}
export default parseUserId;