export const formatTime = (open: string, close: string) => {
  return `${
    open[0] === '0' ? '오전 ' + open.slice(0, 2) : '오후 ' + open.slice(0, 2)
  }시 ~ ${
    close[0] === '0' ? '오전 ' + close.slice(0, 2) : '오후 ' + close.slice(0, 2)
  }시`;
};
