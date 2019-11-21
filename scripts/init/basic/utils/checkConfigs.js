require('@moomfe/zenjs');
const { bgBlackBright } = require('chalk');


module.exports = async ( configs, errors, options ) => {
  await each( configs, options, async ( config, key, check, value ) => {
    // 可选项验证
    if( check.options ){
      if( check.options.includes( value ) === false ){
        errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为 ${ check.options.map( option => JSON.stringify( option ) ).join(', ') } 中的一个, 请检查您的配置文件 !`);
      }
    }

    // 值类型验证
    if( check.type ){
      switch( check.type ){
        case 'isPlainObject': {
          if( Object.$isPlainObject( value ) === false ){
            errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为一个纯粹的对象, 请检查您的配置文件 !`);
          }
          break;
        };
        case 'isFunction': {
          if( ZenJS.isFunction( value ) === false ){
            errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为一个函数, 请检查您的配置文件 !`);
          }
          break;
        };
      }
    }

    // 自定义校验器
    if( check.validator ){
      let result = check.validator( value );

      if( result instanceof Promise ? await result : result ){
        errors.add(
          typeof check.message === 'function' ? check.message( value ) : check.message
        );
      }
    }

  });
}


async function each( configs, options, callback ){
  for( const config of configs ){
    const optionsEntries = Object.entries( options );

    for( const [ key, check ] of optionsEntries ){
      await callback( config, key, check, config[ key ] );
    }
  }
}