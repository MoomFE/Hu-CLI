require('@moomfe/zenjs');


module.exports = ( config ) => {
  const replace = config.replace;


  if( replace && Object.$isPlainObject( replace ) && Object.$isEmptyObject( replace ) === false ){
    const replaceMap = new Map;

    Object.entries( replace ).$each(([ key, value ]) => {
      key = RegExp.$parse( key, 'g' );
      replaceMap.set( key, value );
    });

    return {
      name: 'replace',
      transform( code, id ){
        replaceMap.forEach(( value, key ) => {
          code = code.replace( key, value );
        });
        return code;
      }
    };
  }
}