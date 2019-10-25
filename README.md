# Hu-CLI
Hu-CLI 是一个基于 rollup 的打包工具

<br>
<br>

## 安装

```bash
  > npm install @moomfe/hu-cli -g
```

<br>

## 指令

```bash
  // 打包构建指令, 会自动对代码进行压缩处理
  > hu build

  // 监听模式
  > hu watch
```

<br>

## 配置
```js
  // hu.config.js
  //  - 此配置表为默认配置
  module.exports = {

    // 打包入口文件
    input: 'index.js',
    // 打包输出文件
    output: 'index.js',

    // 打包入口目录
    inputDir: './src',
    // 打包输出目录
    outputDir: './dist',

    // 在打包好的文件最顶部插入一段内容
    banner: '',

    // 将代码中指定文本进行替换
    replace: {
      // 'process.env.NODE_ENV': JSON.stringify('production')
    },

    // 提供给 rollup 的插件列表
    //  - 可以自行安装一些其他的 rollup 插件
    plugins: () => {
      // 需要通过这样一个工厂函数对 rollup 插件进行返回
      return [];
    },

    // 传递给内置插件选项的配置
    pluginOptions: {
      // 传递给 banner 选项相关的配置
      banner: {
        // 需要在打包后插入 banner 的文件类型
        extensions: [ '.js', '.css' ],
        // 当前 banner 是否需要自动转换为注释插入
        isComment: true
      }
    },

    // 项目兼容性
    browserslist: [
      "Chrome >= 49",
      "Firefox >= 47",
      "Safari >= 10",
      "Edge >= 14"
    ],

    // 多项目打包
    pipe: [
      // 会自动继承上一层级的配置
      // {
      //   input: '',
      //   output: ''
      // }
    ]
    
  };
```

<br>

## License

Hu-CLI is licensed under a [MIT License](./LICENSE).