/**
 * 替换 console 中的各个方法
 * 确保在使用 console 输出信息时
 * 没有正在使用 process.stdout.write 输出信息
 */
['log', 'warn', 'error', 'info'].forEach((name) => {
  const fn = console[name];

  console[name] = (...args) => {
    if (process.stdout.isTTY) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
    }
    Reflect.apply(fn, console, args);
  };
});
