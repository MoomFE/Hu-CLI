module.exports = async (fn) => {
  const consoleLog = console.log;
  let stdout = '';

  // 劫持控制台输出
  console.log = (...args) => {
    stdout = `${stdout}\n${args.join('\n')}`;
  };

  const result = fn();
  if (result instanceof Promise) {
    await result;
  }

  // 还原劫持控制台输出
  console.log = consoleLog;

  return stdout;
};
