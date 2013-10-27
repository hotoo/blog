
google.load('search', '1', {language:'zh-CN', "nocss":true});

google.setOnLoadCallback(function(){

  var customSearchControl = new google.search.CustomSearchControl('012242588420705517395:spt0k_ybmgm');
  customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
  var options = new google.search.DrawOptions();
  options.setAutoComplete(true);
  customSearchControl.draw('cse', options);
  customSearchControl.setNoResultsString('什么也没找到，请重试');
  customSearchControl.setResultSetSize(google.search.Search.SMALL_RESULTSET);
  customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_SELF);
  var inCallback = false;
  var t;
  customSearchControl.setSearchCompleteCallback(null,function() {
    if(t){window.clearTimeout(t);}
    inCallback = true;
    $('input.gsc-input').select();
    var searchwords = $('input.gsc-input').val();
    document.title = "搜索："+searchwords+" - 闲耘™.博客";
    location.hash = searchwords;
    //$("#toc_1").text("搜索："+searchwords);
    //$('.p > b').text(searchwords);
    $('a.gs-title').addClass('new').unwrap().wrap('<h3></h3>').each(function() {
      //var title = $(this).html().replace(/Twitter \|/, 'Thread Twitter 本站页面 |').replace(/\|.*/g, '');
      var title=$(this).html().replace(/\- 闲耘™.博客$/, "");
      $(this).html(title);
    });
    //$('h3 > a[href*="twitter.com"]').parent().text('').addClass('search-twitter').next().addClass('tweet round5px').next().next().show();
    //$('.tweet').each(function() {
    //        var tweet = $(this).html().replace(/Login · Join Twitter! /, '').replace(/· fisio.*/g, '');
    //        $(this).html(tweet);
    //});
    $('b:contains("...")').contents().unwrap();
    $('.gsc-cursor-current-page').removeClass('gsc-cursor-page');

    t=window.setTimeout(function(){inCallback=false; t=null;}, 100);
  });

  //customSearchControl.setSearchCompleteCallback(null, function() {
  //    $('input.gsc-input').select();
  //    $('a.gs-title').unwrap().wrap('<h3></h3>').each(function() {
  //        var title = $(this).html().replace(/\|.*/g, '');
  //        $(this).html(title);
  //    });
  //    $('b:contains("...")').contents().unwrap();
  //});

  var key = location.hash.replace("#","");
  if(!key){
    var match = location.search.match(/q=([^&]*)(&|$)/);
    if(match && match[1]){
      key = match[1];
    }
  }
  key = decodeURIComponent(key);

  if(key){
    customSearchControl.execute(key);
  }

  window.onhashchange = function(){
    if(inCallback){
      inCallback = false;
      return;
    }
    var key = location.hash.replace("#","");
    if(key){
      customSearchControl.execute(key);
    }
  };

}, true);
