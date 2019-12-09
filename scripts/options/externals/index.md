## 1. 数组格式

- 若 `externals` 选项是数组格式
- 始终视为外部模块
- 添加进 `external`, 不添加进 `globals`, 不添加进 `paths`
``` js
  {
    externals: [
      '@moomfe/hu'
    ]
  }
```



## 2. 对象格式

### 2.1

- 若定义的模块的值为 `''`, `null`, `undefined` 时
- 对应模块始终视为外部模块
- 添加进 `external`, 不添加进 `globals`, 不添加进 `paths`
``` js
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
- 对应模块始终视为外部模块
- 且在 `iife` 和 `umd` 模式下, 对应模块的值视为 `globals` 选项的内容
- 添加进 `external` 和 `globals`, 不添加进 `paths`
``` js
  {
    externals: {
      '@moomfe/hu': 'Huu'
    }
  }
```

### 2.3

- 若定义的模块的值为对象类型
- 当前打包模式若在对象内匹配到对应的值, 则按照 `2.1`, `2.2` 的方式进行处理
- 当前打包模式若在对象内没有匹配到对应的值, 则视为在当前模式下不视为外部模块
``` js
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
- 当前打包模式若在对象内匹配到对应的值, 则按照 `2.1`, `2.2` 的方式进行处理
- 当前打包模式若在对象内没有匹配到对应的值, 则取 `default` 字段的值按照 `2.1`, `2.2` 的方式进行处理
``` js
  {
    externals: {
      '@moomfe/hu': {
        'iife': 'Hu',
        'default': 'Huui'
      }
    }
  }
```

### 2.4

- 最详细的定义模式
- 定义的 `path` 的值视为 `paths` 选项的内容
- 定义的 `root` 的值视为 `globals` 选项的内容
- 其他和上述完全一致
``` js
  {
    externals: {
      '@moomfe/hu': {
        'cjs': {
          'path': '@moomfe/huu'
        },
        'umd': {
          'root': 'Hu',
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
          'root': 'Hu'
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
        'default': 'Hu'
      }
    }
  }

  // 补充 3
  {
    externals: {
      '@moomfe/hu': {
        // 在值被定义为字符串时, 不会从 default 继承参数
        'umd': 'Hu',
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