const { isFunction, isArray } =  require('@moomfe/zenjs');
const { bgBlackBright } = require('chalk');


module.exports = async ( configs, errors, options ) => {
  await each( configs, options, async ( config, key, check, value ) => {
    /** 当前配置项是否检测通过 */
    let stateResult = true;

    // 可选项验证
    if( check.options ){
      if( check.options.includes( value ) === false ){
        errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为 ${ check.options.map( option => JSON.stringify( option ) ).join(', ') } 中的一个, 请检查您的配置文件 !`);
        stateResult = false;
      }
    }

    // 值类型验证
    if( check.type ){
      switch( check.type ){
        case 'isPlainObject': {
          if( Object.$isPlainObject( value ) === false ){
            errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为一个纯粹的对象, 请检查您的配置文件 !`);
            stateResult = false;
          }
          break;
        };
        case 'isFunction': {
          if( isFunction( value ) === false ){
            errors.add(`${ bgBlackBright(` ${ key } `) } : 选项必须为一个函数, 请检查您的配置文件 !`);
            stateResult = false;
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
        stateResult = false;
      }
    }

    return stateResult;
  });
}


async function each( configs, options, callback ){
  // 循环每一个配置表
  for( const config of configs ){
    const optionsEntries = Object.entries( options );
    const states = Object.create( null );
    const caches = Object.create( null );

    // 循环每一个选项的检测定义
    for( const [ key, checks ] of optionsEntries ){
      // 选项的检测定义可以是一个数组
      if( isArray( checks ) ){
        for( const check of checks ) await run( states, caches, callback, config, key, check )
      }else{
        await run( states, caches, callback, config, key, checks );
      }
    }

    // 配置表书写错误
    if( Object.$isEmptyObject( caches ) === false ){
      throw `检测到配置表发生异常, 未找到以下依赖选项: ${ Object.keys( caches ).map( option => JSON.stringify( option ) ).join(', ') }`;
    }
  }
}

async function run( states, caches, callback, config, key, check, value = config[ key ] ){
  const dependency = check.dependency;

  // 如果当前检测定义没有依赖, 或者依赖已经执行过
  if( !dependency || dependency in states ){
    const state = states[ key ] = await callback( config, key, check, value );

    // 如果缓存中有把当前选项当做依赖的, 立即执行
    if( caches[ key ] ){
      for( const args of caches[ key ] ) await run( ...args );
      delete caches[ key ];
    }

    return state;
  }
  // 依赖还未执行, 先把相关参数存起来
  else{
    ( caches[ dependency ] || ( caches[ dependency ] = [] ) ).push( arguments );
  }
}