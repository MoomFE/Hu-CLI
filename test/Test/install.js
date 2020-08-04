const { promisify } = require('util');
const { exec } = require('child_process');
const { root } = require('../Lib/const');


(async () => {
  const dependencies = require('../package.json').dependencies;
  const dependenciesKey = Object.keys(dependencies);

  for (const dependencieKey of dependenciesKey) {
    try {
      // eslint-disable-next-line import/no-dynamic-require
      require(`../node_modules/${dependencieKey}/package.json`);
    } catch (error) {
      // eslint-disable-next-line no-await-in-loop
      await promisify(exec)(`npm install ${dependencieKey}`, {
        cwd: root
      });
    }
  }
})();
