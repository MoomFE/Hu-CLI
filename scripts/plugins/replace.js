require('@moomfe/zenjs');


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

    Object.entries( replace ).$each(([ from, to ]) => {
      replaceArray.push([
        RegExp.$parse( from, 'g' ),
        to
      ]);
    });
  }
  // 数组类型传参
  else if( Array.isArray( replace ) ){
    replace.forEach( config => {
      const { from, to } = config;
      
      if( ZenJS.isRegExp( from ) ){
        replaceArray.push([
          from,
          to
        ]);
      }else if( ZenJS.isString( from ) ){
        parseReplaceOptions({ [ from ]: to }, replaceArray);
      }
    });
  }
  // 不合法选项
  else{
    return;
  }

  return replaceArray;
}