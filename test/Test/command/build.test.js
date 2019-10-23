const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');


describe( 'command.build', function(){
  this.timeout( Infinity );

  it( '在使用 build 指令时, 在生成打包配置时会自动加载 terser 用于代码压缩', () => {
    process.env.HU_RUNNING_COMMAND = 'build';
    {
      const rollupConfig = compilerRollupConfigs()[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'terser' })
      ).is.not.undefined;
    }

    // 使用 watch 指令
    process.env.HU_RUNNING_COMMAND = 'watch';
    {
      const rollupConfig2 = compilerRollupConfigs()[0];

      expect(
        rollupConfig2.input.plugins.$find({ name: 'terser' })
      ).is.undefined;
    }

    // 使用其他指令
    process.env.HU_RUNNING_COMMAND = '';
    {
      const rollupConfig3 = compilerRollupConfigs()[0];

      expect(
        rollupConfig3.input.plugins.$find({ name: 'terser' })
      ).is.undefined;
    }
  });

});