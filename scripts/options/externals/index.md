## 1. 数组格式

- 若 `externals` 选项是数组格式
- 数组内的模块则始终视为外部模块
- 在所有打包模式下添加进 `external` 选项内
```js
  {
    externals: [
      '@moomfe/hu'
    ]
  }
```



## 2. 对象格式

### 2.1

- 若定义的模块的值为 `''`, `null`, `undefined` 时
- 对应模块则始终视为外部模块
- 在所有打包模式下添加进 `external` 选项内
```js
  {
    externals: {
      '@moomfe/hu': ''
    },
    externals: {
      '@moomfe/hu': null
    },
    externals: {
      '@moomfe/hu': undefined
    }
  }
```

### 2.2

- 若定义的模块的值为字符串类型
- 对应模块则始终视为外部模块
- 在所有打包模式下添加进 `external` 选项内
- 在 `iife` 和 `umd` 打包模式下, 对应模块的值视为 `globals` 选项的内容
```js
  {
    externals: {
      '@moomfe/hu': 'Huu'
    }
  }
```

### 2.3

- 若定义的模块的值为对象类型
- 当前打包模式若可以在对象内匹配到对应的值, 则按照 `2.1`, `2.2` 的方式进行处理
- 当前打包模式若无法在对象内匹配到对应的值, 则在当前模式下不视为外部模块
```js
  {
    externals: {
      '@moomfe/hu': {
        'iife': 'Huu',
        'cjs': ''
      }
    }
  }
```

### 2.3.1

- 若定义的模块的值为对象类型
- 当前打包模式若可以在对象内匹配到对应的值, 则按照 `2.1`, `2.2` 的方式进行处理
- 当前打包模式若无法在对象内匹配到对应的值, 则取 `default` 字段的值按照 `2.1`, `2.2` 的方式进行处理
```js
  {
    externals: {
      '@moomfe/hu': {
        'iife': 'Hu',
        'default': 'Huuu'
      }
    }
  }
```

### 2.4

- 最详细的定义模式
- 定义的 `path` 视为 `paths` 选项的内容, 只在非 `iife` 打包模式下生效
- 定义的 `root` 视为 `globals` 选项的内容, 只在非 `iife`, `umd` 打包模式下生效
- 其他和上述完全一致
```js
  {
    externals: {
      '@moomfe/hu': {
        'cjs': {
          'path': '@moomfe/huu'
        },
        'umd': {
          'root': 'Huuu',
          'path': '@moomfe/huuu'
        },
        'default': {
          'path': '@moomfe/huuuu'
        }
      }
    }
  }

  // 补充 1
  {
    externals: {
      '@moomfe/hu': {
        // 在值被定义为对象时, 对象内没有的参数会从 default 继承
        // 比如此时, umd 在被解析时, 实际是:
        // 
        // 'umd': {
        //   'root': 'Hu',
        //   'path': '@moomfe/huuuu'
        // }
        'umd': {
          'root': 'Huu'
        },
        'default': {
          'path': '@moomfe/huuuu'
        }
      }
    }
  }

  // 补充 2
  {
    externals: {
      '@moomfe/hu': {
        // 在值被定义为对象时, 对象内没有的参数会从 default 继承
        // 比如此时, umd 在被解析时, 实际是:
        // 
        // 'umd': {
        //   'root': 'Hu',
        //   'path': '@moomfe/huuuu'
        // }
        'umd': {
          'path': '@moomfe/huuuu'
        },
        'default': 'Huu'
      }
    }
  }

  // 补充 3
  {
    externals: {
      '@moomfe/hu': {
        // 在值被定义为字符串时, 不会从 default 继承参数
        'umd': 'Huu',
        'default': {
          'path': '@moomfe/huuuu'
        }
      }
    }
  }
```



## 附录

1. `external`: 为 `rollup` 的 `input.external` 选项
2. `globals`: 为 `rollup` 的 `output.globals` 选项
3. `paths`: 为 `rollup` 的 `output.paths` 选项