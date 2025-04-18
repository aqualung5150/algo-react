const isEmptyOrSpaces = (str: string) => {
  return str === null || str.match(/^ *$/) !== null;
};

export default isEmptyOrSpaces;
