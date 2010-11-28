(function(){
    var Er={
        "the-duplicate-element":1,
        "form-in-action":1,
        "vimmer-contact":1,
        "css-hover-for-ie6":1,
        "tts":1,
        "hashchange":1,
        "cancel-vs-undo":1,
        "jump-to-difftext":1,
        "about-Privacy":1,
        "vim73-tee":1,
        "about-sql-like":1,
        "gitdiff-with-vim":1,
        "integrate-guide-button-and-status-button":1,
        "performance-for-each-char":1,
        "use-vim-calendar":1,
        "open-files-in-vim-tabs":1,
        "vim-autocomplete-pairs":1,
        "3d-game-in-google-maps":1,
        "vimwiki-google-code":1,
        "log-syntax-4-vim":1,
        "Dropbox-died-in-China":1,
        "hometown":1,
        "outreach-activities-2010-04":1,
        "Vim-tutor":1,
        "Gtalk-group-for-Vim":1,
        "form-design":1,
        "China-joke":1,
        "convert-encoding-note":1,
        "snippets-for-html":1,
        "use-vimwiki-for-blog":1,
        "Vimwiki":1,
        "WeekNumber":1,
        "Vim-Chinese-Doc":1,
        "css-limit-bg":1,
        "forbid-cnnic":1,
        "regex-share":1,
        "editplus-and-everything":1,
        "performance-for-regex-repeat-sub-pattern":1,
        "performance-of-arguments-to-array":1,
        "index-near-the-content":1,
        "place-of-lift-floor-control-panel":1,
        "safari-4-select-bug":1
    };
    var path = location.pathname;
    if(!("/"==path || "/index.html"==path || /\/archive-\d{4}\.html$/.test(path))){
        var p=path.replace(/.*\/([a-zA-Z0-9_-]+)\.html$/, "$1"),
            b=(p in Er && 1==Er[p]);
        initComment(p, b);
    }else{
        initCommentCount();
    }

})();

var disqus_shortname = 'hotoo';
function initCommentCount(){
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

    var s = document.createElement('script'); s.async = true;
    s.src = 'http://disqus.com/forums/hotoo/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}

/**
 * var disqus_identifier; [Optional but recommended: Define a unique identifier (e.g. post id or slug) for this thread]
 */
var disqus_identifier, disqus_url;
function initComment(p, b){
    if(b){
        disqus_url = "http://hotoo.github.com/blog"+location.pathname;
    }else{
        disqus_identifier = p;
    }
    if(window.console && window.console.log){window.console.log(disqus_url);}
    if(window.console && window.console.log){window.console.log(disqus_identifier);}

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://hotoo.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}
