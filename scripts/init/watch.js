const rollup = require('rollup');


module.exports = async () => {
  const configs = await require('./basic/index.js')();
  const watcher = rollup.watch(
    configs.map( config => {
      return Object.assign( config.input, {
        output: config.output,
        watch: {
          chokidar: true
        }
      });
    })
  );
}