(function(){
    var path = location.pathname;
    if(!("/"==path || "/index.html"==path || /\/archive-\d{4}\.html$/.test(path))){return;}

    var cont=document.getElementById("container");
    var a=cont.getElementsByTagName("a");
    for(var i=a.length-1,disqus_url; i>=0; i--){
        if(a[i].parentNode.tagName.toLowerCase()!="li"){continue;}
        var cmt=document.createElement("a");
        cmt.className="comment-count";
        disqus_url = "http://hotoo.github.com/blog"+a[i].pathname;
        cmt.href=disqus_url+"#disqus_thread";
        cmt.appendChild(document.createTextNode("评论"));
        var span=document.createElement("span");
        span.className="comment-count";
        span.appendChild(document.createTextNode("("));
        span.appendChild(cmt);
        span.appendChild(document.createTextNode(")"));
        a[i].parentNode.appendChild(span);
    }
})();
