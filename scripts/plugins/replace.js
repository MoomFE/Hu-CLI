

module.exports = ( config ) => {
  const replaceArray = parseReplaceOptions( config.replace, [] );

  if( replaceArray && replaceArray.length ) return {
    name: 'replace',
    transform( code, id ){
      replaceArray.forEach(([ key, value ]) => {
        code = code.replace( key, value );
      });
      return code;
    }
  };
}


function parseReplaceOptions( replace, replaceArray ){
  // 不合法选项
  if( !replace ){
    return;
  }

  // 正常传参
  if( Object.$isPlainObject( replace ) ){
    // 空传参
    if( Object.$isEmptyObject( replace ) ){
      return;
    }

    Object.entries( replace ).$each(([ key, value ]) => {
      const regKey = RegExp.$parse( key, 'g' );
      replaceArray.push([
        regKey,
        value
      ]);
    });
  }
  // Map 类型传参支持
  else if( replace instanceof Map ){
    replace.forEach(( value, key ) => {
      if( ZenJS.isString( key ) || ZenJS.isRegExp( key ) ){
        replaceArray.push([
          key,
          value
        ]);
      }
    })
  }
  // 数组类型支持
  else if( Array.isArray( replace ) ){
    replace.forEach( value => {
      parseReplaceOptions( value, replaceArray );
    });
  }
  // 不合法选项
  else{
    return;
  }

  return replaceArray;
}