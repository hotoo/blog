/**
 * @overview
 *
 * @author 闲耘™ (hotoo.cn[AT]gmail.com)
 * @version 2013/02/16
 */

define(function(require, exports, module){

  var $ = require("jquery");

  $('#searchbox').submit(function(){
    location.href = "/search.html#"+$('input[name="q"]').val();
    return false;
  });
});
