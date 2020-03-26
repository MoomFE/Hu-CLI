/* eslint-disable brace-style */
/* eslint-disable no-use-before-define */


require('@moomfe/zenjs');


module.exports = (config, rollupConfig) => {
  const { externals, format } = config;
  const { input, output } = rollupConfig;

  // 1
  if (Array.isArray(externals)) {
    externals.forEach((id) => {
      input.external.push(id);
    });
  }
  // 2
  else if (Object.$isPlainObject(externals) && Object.$isEmptyObject(externals) === false) {
    Object.entries(externals).forEach(([id, root]) => {
      // 2.1, 2.2
      if (rootHandler(input, output, format, id, root) === true) {
        return;
      }
      // 2.3
      if (Object.$isPlainObject(root)) {
        // 2.3
        if (format in root) {
          if (rootHandler(input, output, format, id, root[format]) === true) return;
        }
        // 2.3.1
        else if ('default' in root) {
          if (rootHandler(input, output, format, id, root.default) === true) return;
        }
      }
      // 2.4
      if (Object.$isPlainObject(root)) {
        if (format in root) {
          if (Object.$isPlainObject(root[format])) {
            const rootObj = Object.$assign(null, getDefaultObj(root), root[format]);

            if ('root' in rootObj) {
              rootHandler(input, output, format, id, rootObj.root);
            }
            if ('path' in rootObj) {
              pathHandler(input, output, format, id, rootObj.path);
            }
          }
        } else if ('default' in root) {
          const defaultObj = getDefaultObj(root);

          if ('root' in defaultObj) {
            rootHandler(input, output, format, id, defaultObj.root);
          }
          if ('path' in defaultObj) {
            pathHandler(input, output, format, id, defaultObj.path);
          }
        }
      }
    });
  }
};


function rootHandler(input, output, format, id, root) {
  // 2.1
  if (root === '' || root == null) {
    input.external.push(id);
    return true;
  }
  // 2.2
  if (typeof root === 'string') {
    input.external.push(id);

    if (format === 'iife' || format === 'umd') {
      output.globals[id] = root;
    }

    return true;
  }
}

function pathHandler(input, output, format, id, path) {
  if (path && typeof path === 'string') {
    if (format !== 'iife') {
      input.external.includes(id) || input.external.push(id);
      output.paths[id] = path;
    }
  }
}

function getDefaultObj(root) {
  const defaultObj = {};

  if ('default' in root) {
    const currentDefault = root.default;

    if (typeof currentDefault === 'string') {
      defaultObj.root = currentDefault;
    } else if (Object.$isPlainObject(currentDefault)) {
      Object.assign(defaultObj, currentDefault);
    }
  }

  return defaultObj;
}
