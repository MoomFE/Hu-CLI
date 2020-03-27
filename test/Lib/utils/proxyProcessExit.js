module.exports = async (fn) => {
  const processExit = process.exit;
  let isExit = false;

  // 劫持进程退出
  process.exit = () => {
    isExit = true;
  };

  const result = fn();
  if (result instanceof Promise) {
    await result;
  }

  // 还原劫持进程退出
  process.exit = processExit;

  return isExit;
};
