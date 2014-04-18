
# 搜索

- nosearch: true

----

<style>
  form > input[name=q],
  form > input[type=submit]{
    -webkit-appearance: none;
    font-size:1.5em;
    border: 1px solid #ccc;
  }

  form > input[name=q]{
    width:400px;
  }

  form > input[type=submit]{
    width:100px;
  }

  #container table ,
  #container table td{
    border:0 none!important;
    margin:0!important;
  }
  #container table:hover {
    -moz-box-shadow: 0 0 0 #666!important;
    -webkit-box-shadow: 0 0 0 #666!important;
    box-shadow: 0 0 0 #666!important;
  }
</style>

<div>
 <form action="/search.html">
  <input type="text" name="q" autocomplete="off" autofocus />
  <input type="submit" value="搜索" />
 </form>
</div>

<div>
  <script>
  (function() {
    var cx = '012242588420705517395:spt0k_ybmgm';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
  </script>
  <gcse:searchresults-only linkTarget=""></gcse:searchresults-only>

  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
  <script>
    $(function(){
      var match = location.search.match(/q=([^&]*)(&|$)/);
      if(match && match[1]){
        key = match[1];
      }
      key = decodeURIComponent(key);
      $('input[name]').val(key);
    });
  </script>
</div>

[« 首页](/)
