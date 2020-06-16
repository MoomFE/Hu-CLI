const sass = require('node-sass');


module.exports = (data) => {
  return new Promise((resolve) => {
    sass.render({ data }, (error, result) => {
      resolve(
        result.css.toString()
      );
    });
  });
};
