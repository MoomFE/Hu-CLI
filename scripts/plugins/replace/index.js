require('@moomfe/zenjs');


module.exports = (config) => {
  const replaceArray = parseReplaceOptions([], config.replace);

  // eslint-disable-next-line curly
  if (replaceArray && replaceArray.length) return {
    name: 'hu:replace',
    transform(code, id) {
      replaceArray.forEach(([searchValue, replaceValue]) => {
        code = code.replace(searchValue, replaceValue);
      });
      return code;
    }
  };
};

function parseReplaceOptions(replaceArray, replaceOptions) {
  // 不合法选项
  if (!replaceOptions) {
    return;
  }

  // 普通 JSON 传参
  if (Object.$isPlainObject(replaceOptions)) {
    // 空 JSON 传参
    if (Object.$isEmptyObject(replaceOptions)) {
      return;
    }

    Object.entries(replaceOptions).forEach(([from, replaceValue]) => {
      const searchValue = RegExp.$parse(from, 'g');

      replaceArray.push([
        searchValue,
        replaceValue
      ]);
    });

    return replaceArray;
  }

  // 数组类型传参
  if (Array.isArray(replaceOptions)) {
    replaceOptions.forEach(({ from, to }) => {
      if (from instanceof RegExp) {
        return replaceArray.push([from, to]);
      }
      if (typeof from === 'string') {
        parseReplaceOptions(replaceArray, {
          [from]: to
        });
      }
    });
  }

  return replaceArray;
}
