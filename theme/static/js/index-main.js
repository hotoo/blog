/**
 * @overview
 *
 * @author 闲耘™ (hotoo.cn[AT]gmail.com)
 * @version 2013/02/16
 */

define(function(require, exports, module){

  var $ = require("jquery");

  var time = $('footer.post > time');
  time.html(time.html().replace(/,\s+(\d{4})/,
    '<a href="archives.html#$1">$1</a>')
  );
});
