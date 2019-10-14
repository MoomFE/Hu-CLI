


module.exports = async () => {
  const originConfigs = await require('./util/getConfigFile.js')();
  const configs = require('./util/compilerConfigs')( originConfigs );


};