const { extname } = require('path');


module.exports = (config) => {
  let banner = config.banner;

  if (banner && typeof banner === 'string') {
    const bannerOptions = config.pluginOptions.banner || {};
    const extensions = bannerOptions.extensions || [];

    if (extensions.length === 0) {
      return;
    }

    if (bannerOptions.isComment) {
      banner = banner.replace(/\*\//, '*\\/');
      banner = banner.split(/\r\n|\r|\n/);
      banner = banner.map((line) => {
        return line ? ` * ${line}` : ' *';
      });
      banner = ['/*!', ...banner, ' */\n\n'].join('\n');
    }

    return {
      name: 'hu:banner',
      async generateBundle(outputOptions, bundle, isWrite) {
        Object.entries(bundle).forEach(([name, options]) => {
          const ext = extname(options.fileName);

          if (extensions.includes(ext)) {
            options.code = banner + options.code;
          }
        });
      }
    };
  }
};
