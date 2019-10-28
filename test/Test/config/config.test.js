const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');


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

    await compilerRollupConfigs( null, true );

    expect( processExit.isExit ).is.false;
    processExit.end();
  });

});