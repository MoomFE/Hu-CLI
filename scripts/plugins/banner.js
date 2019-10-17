const { extname } = require('path');


module.exports = ( config ) => {
  let banner = config.banner;

  if( banner && typeof banner === 'string' ){
    const options = config.pluginOptions.banner || {};
    const extensions = options.extensions || [];

    if( extensions.length === 0 ){
      return;
    }

    if( options.isComment ){
      banner = banner.replace( /\*\//, '*\\/' );
      banner = banner.split( /\r\n|\r|\n/ );
      banner = banner.map( line => ' * ' + line );
      banner = [ '/*!', ...banner, ' */\n\n' ].join('\n');;
    }

    return {
      name: 'banner',
      generateBundle: async function( outputOptions, bundle, isWrite ){
        Object.entries( bundle ).forEach(([ name, options ]) => {
          const ext = extname( options.fileName );

          if( extensions.includes( ext ) ){
            options.code = banner + options.code;
          }
        });
      }
    };
  }
}