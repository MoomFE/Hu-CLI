const { promisify } = require('util');
const { exec } = require('child_process');
const { root } = require('../Lib/const');


(async () => {
  try {
    require('../node_modules/@moomfe/hu/package.json');
  } catch (error) {
    return promisify(exec)('npm install @moomfe/hu', {
      cwd: root
    });
  }
})();
