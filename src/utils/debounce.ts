export const debounce = <Params extends any[]>(
  callback: (...args: Params) => any,
  timeout = 500
): ((...args: Params) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
