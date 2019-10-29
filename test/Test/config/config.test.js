const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const proxyLog = require('../../Lib/utils/proxyLog');


describe( 'config', function(){
  this.timeout( Infinity );

  const processExit = {
    fn: process.exit,
    isExit: false,
    start(){
      this.isExit = false;
      process.exit = () => {
        this.isExit = true;
      }
    },
    end(){
      process.exit = this.fn;
    }
  };

  it( '未使用 pipe 选项进行多项目打包时, 当前配置表会视为一个有效的配置表', () => {
    expect(
      compilerRollupConfigs().length
    ).is.equals( 1 );
  });

  it( '当使用 pipe 选项进行多项目打包时, 当前配置表将不再视为一个有效的配置表', () => {
    const rollupConfigs = compilerRollupConfigs({
      pipe: [
        {},
        {}
      ]
    });

    expect( rollupConfigs.length ).is.equals( 2 );
  });

  it( '对配置进行解析时, 若配置合法, 打包程序会正确执行', async () => {
    processExit.start();
    expect( processExit.isExit ).is.false;

    const stdout = await proxyLog( async () => {
      await compilerRollupConfigs( null, true );
    });

    expect( stdout ).is.equals('');
    expect( processExit.isExit ).is.false;
    processExit.end();
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( format )', async () => {
    // 1
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: ''
        }, true);
      });

      expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' 中的一个`);
      expect( processExit.isExit ).is.true;
      processExit.end();
    }
    // 2
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'xxx'
        }, true);
      });

      expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' 中的一个`);
      expect( processExit.isExit ).is.true;
      processExit.end();
    }
    // 3
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 0
        }, true);
      });

      expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' 中的一个`);
      expect( processExit.isExit ).is.true;
      processExit.end();
    }
    // 4
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: true
        }, true);
      });

      expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' 中的一个`);
      expect( processExit.isExit ).is.true;
      processExit.end();
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    // 1
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'amd'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
    // 2
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'cjs'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
    // 3
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'system'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
    // 4
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'esm'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
    // 5
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'iife'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
    // 6
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          format: 'umd'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( pluginOptions )', async () => {
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          pluginOptions: []
        }, true);
      });

      expect( stdout ).is.includes('选项必须为一个纯粹的对象, 请检查您的配置文件');
      expect( processExit.isExit ).is.true;
      processExit.end();
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          pluginOptions: {}
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( plugins )', async () => {
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          plugins: []
        }, true);
      });

      expect( stdout ).is.includes('选项必须为一个函数并且函数返回 plugins 数组, 请检查您的配置文件');
      expect( processExit.isExit ).is.true;
      processExit.end();
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          plugins: () => []
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
  });

  it( '对配置进行解析时, 若入口文件不存在, 将会退出打包程序', async () => {
    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          _code: null
        }, true);
      });

      expect( stdout ).is.includes('未找到需要打包的入口文件');
      expect( processExit.isExit ).is.true;
      processExit.end();
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      processExit.start();
      expect( processExit.isExit ).is.false;

      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs({
          _code: 'null'
        }, true);
      });

      expect( stdout ).is.equals('');
      expect( processExit.isExit ).is.false;
      processExit.end();
    }
  });

});