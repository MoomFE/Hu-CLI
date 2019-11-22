const { isFunction, isArray } =  require('@moomfe/zenjs');
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
          if( isFunction( value ) === false ){
            errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为一个函数, 请检查您的配置文件 !`);
          }
          break;
        };
      }
    }

    // 自定义校验器
    if( check.validator ){
      const validator = check.validator( value, config );
      const validatorResult = validator instanceof Promise ? await validator : validator;
      const state = Object.$isPlainObject( validatorResult ) ? !validatorResult.state : !validatorResult;

      if( state ){
        const message = isFunction( check.message ) ? check.message( value, validatorResult ) : check.message;
        errors.add( message );
      }
    }

  });
}


async function each( configs, options, callback ){
  for( const config of configs ){
    const optionsEntries = Object.entries( options );

    for( const [ key, checks ] of optionsEntries ){
      if( isArray( checks ) ){
        for( const check of checks ){
          await callback( config, key, check, config[ key ] );
        }
      }else{
        await callback( config, key, checks, config[ key ] );
      }
    }
  }
}