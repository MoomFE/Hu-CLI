

module.exports = ( config ) => {
  const replace = config.replace;
  const replaceMap = new Map;

  if( !replace ){
    return;
  }

  // 正常传参
  if( Object.$isPlainObject( replace ) ){
    // 空对象
    if( Object.$isEmptyObject( replace ) ){
      return;
    }

    Object.entries( replace ).$each(([ key, value ]) => {
      const regKey = RegExp.$parse( key, 'g' );
      replaceMap.set( regKey, value );
    });
  }
  // Map 类型传参支持
  else if( replace instanceof Map ){
    replace.forEach(( value, key ) => {
      if( ZenJS.isString( key ) || ZenJS.isRegExp( key ) ){
        replaceMap.set( key, value );
      }
    });
  }
  // 不支持的值
  else{
    return;
  }

  if( replaceMap.size ){
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