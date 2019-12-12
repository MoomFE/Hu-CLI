  - 🌟 使用 `watch` / `build` 指令时可以使用 `-c`, `--config` 指定配置文件

# 1.7.0
  - 📅 2019-12-10
  - 🌟 增加对 `.json` 文件的支持
  - 🌟 增加对 `.json5` 文件的支持
  - 💄 选项 `pluginOptions` 支持传入 `null` 从而完全不使用从父级继承的配置
  - 💄 选项 `plugins` 支持传入 `null` 从而完全不使用从父级继承的配置
  - 💄 选项 `externals` 的功能完全重构, 功能更加强大
  - 💄 选项 `format` 的可选值支持添加自定义命名空间, 如: `esm.browser`, `umd.xxx`
  - ⚠️ 移除选项 `format` 的可选值 `esm.browser`

# 1.6.0
  - 📅 2019-11-25
  - 🌟 新增 `externals` 选项, 用于标识外部依赖
  - 💄 <s>选项 `format` 新增可选值 `esm.browser`, 表现和 `esm` 完全一致, 只用作 `externals` 的区分上</s> ( 1.7.0 移除 )

# 1.5.1
  - 📅 2019-11-20
  - 💄 新增 `pluginOptions.templateMinifier` 选项, 用于配置传递给内部使用的 `@moomfe/hu-template-minifier` 插件的配置
  - 💄 为 `plugins`, `configureRollup` 选项内传入的 `config` 参数添加 `_originConfig` 选项, 为原始配置
  - 💄 为 `plugins`, `configureRollup` 选项内传入的 `config` 参数添加 `_mergedConfig` 选项, 为原始配置项与默认配置合并后的配置

# 1.5.0
  - 📅 2019-11-12
  - 🌟 在开发模式下会使用 `@moomfe/hu-template-minifier` 对模板进行压缩

# 1.4.4
  - 📅 2019-11-05
  - 💄 优化控制台信息的显示
  - 💄 将开发模式下默认使用 `terser` 压缩代码的次数由 3 次改为 1 次
  - 💄 将 `banner` 插件的顺序提前, 防止自行安装的插件在使用 `generateBundle` 选项时取到的代码是不带 `banner` 输出的

# 1.4.3
  - 📅 2019-10-31
  - 💄 新增 `pluginOptions.terser` 选项, 用于配置传递给内部使用的 `rollup-plugin-terser` 插件的配置
  - 💄 新增 `pluginOptions.commonjs` 选项, 用于配置传递给内部使用的 `rollup-plugin-commonjs` 插件的配置
  - 💄 新增 `pluginOptions.nodeResolve` 选项, 用于配置传递给内部使用的 `rollup-plugin-node-resolve` 插件的配置

# 1.4.2
  - 📅 2019-10-30
  - 💄 `plugins` 选项会在执行时传入解析后的 Hu-CLI 配置
  - 💄 `configureRollup` 选项会在执行时传入解析后的 Hu-CLI 配置

# 1.4.1
  - 📅 2019-10-30
  - 💄 优化控制台警告信息的显示
  - 💄 优化控制台在一些边界情况下信息的显示
  - 💄 优化在使用 watch 指令时, 错误提示的显示

# 1.4.0
  - 📅 2019-10-29
  - 🌟 新增 `mode` 选项, 用于指定当前配置的打包模式
  - ⚠️ 不再根据执行的指令判断是否对代码进行压缩

# 1.3.0
  - 📅 2019-10-29
  - 🌟 新增 `configureRollup` 方法选项, 可用于对解析后配置的修改

# 1.2.0
  - 📅 2019-10-28
  - ⚠️ 在使用了 pipe 选项后, 与 pipe 同级的配置将不再视为一个有效的配置表, 仅用作继承给 pipe 内的打包配置用
  - 🐞 修复使用打包指令时提示错误导致退出的问题

# 1.1.0
  - 📅 2019-10-28
  - 🌟 新增 `format` 选项, 定义输出的文件类型
  - 🌟 新增 `name` 选项, 定义生成 UMD 和 IIFE 模块的名字

# 1.0.0
  - 📅 2019-10-25
  - 🌟 基本功能已完成

<br>
<hr>
<br>
版本规范

1. 主版本号: 破坏性更新和新特性
2. 次版本号: 向下兼容的功能新增、功能更改、功能优化
3. 修订版本号: 向下兼容的问题修正、一般功能优化
<br>
<hr>
<br>
CHANGELOG 图标规范

- 🌟: 功能新增<br>
- 💄: 功能更改、功能优化<br>
- ⚠️: 与上一版本可能不兼容的功能更改<br>
- 🐞: 问题修正<br>
- 📅: 版本发布日期