const { isString } = require('@moomfe/zenjs');


module.exports = ( config, rollupConfig ) => {
  // 处理外部依赖项
  if( Object.$isEmptyObject( config.externals ) === false ){
    Object.entries( config.externals ).forEach(([ id, variableName ]) => {
      if( !isString( variableName ) ){
        if( variableName == null || ( variableName = isString( variableName[ config.format ] ) ? variableName[ config.format ] : variableName.default ) == null ){
          return;
        }
      }

      rollupConfig.input.external.push( id );
      rollupConfig.output.globals[ id ] = variableName;
    });
  }
}