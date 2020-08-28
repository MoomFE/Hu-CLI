/**
 * 创建劫持控制台输出的方法
 * @param {string} name 需要劫持的控制台方法名称
 */
function proxyLogFactory(name) {
  return async (fn) => {
    const consoleFn = console[name];
    let stdout = '';

    // 劫持控制台输出
    console[name] = (...args) => {
      stdout = `${stdout}\n${args.join('\n')}`;
    };

    const result = fn();

    // 如果传入方法是异步函数, 则等待传入方法执行完成
    if (result instanceof Promise) {
      await result;
    }

    // 还原劫持控制台输出
    console[name] = consoleFn;

    return stdout;
  };
}


module.exports = proxyLogFactory('log');
module.exports.error = proxyLogFactory('error');
