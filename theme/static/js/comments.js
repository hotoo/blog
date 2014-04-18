function $(id){return document.getElementById(id);}
(function(){

    // liner.
    function lines(elem, idx){
        var code = elem.innerHTML;
        //var m = code.match(/\r\n|\r|\n/g);
        //var l = (m ? m.length : 0)+1;
        var m = code.split('\n');
        var l = m.length - 1;
        if(m[0]==""){l -= 1;}
        if(m[m.length-1]==""){l -= 1;}

        var container = document.createElement("div");
        container.className = "codes";

        var content = document.createElement("div");
        content.className = "code";

        line = document.createElement("pre");
        line.className = "line";
        line.style.width = (String(l).length+1)+"em";
        elem.style.marginLeft = (String(l).length+1)+"em";
        var ln = [];
        for(var i=1; i<=l; i++){
            ln.push('<a name="L'+idx+"-"+i+'" href="#L'+idx+"-"+i+'">'+i+'</a>');
        }
        if("innerText" in line && "outerHTML" in line){
            line.innerHTML = ln.join("<br/>");
        }else{
            line.innerHTML = ln.join("\n");
        }

        container.appendChild(content);
        container.appendChild(line);
        elem.parentNode.insertBefore(container, elem);
        var childNode = elem.firstChild;
        if(childNode.tagName == "CODE"){
          elem.innerHTML = childNode.innerHTML;
        }
        content.appendChild(elem);
    }

    //var pre = document.getElementsByTagName("pre");
    //for(var i=pre.length-1; i>=0; i--){
        //lines(pre[i], i+1);
    //}

    // comments.
    // 这些是在 hotoo.github.com 时开启评论的日志。
    // 如果当前日志是这些里面的，则使用老的评论 disqus_url
    // 否则，设置 disqus_identifier 为当前日志名，方便域名迁移。
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
        "safari-4-select-bug":1,
        "reverse-search":1,
        "cpp-check-type":1,
        "impoved-fold-for-vim":1,
        "vim-cue":1,
        "vim-css3":1,
        "vim-html5":1,
        "validator-for-vim":1,
        "fuck-gfw-with-tor":1,
        "firefox-profile-and-multi-instance":1,
        "map-home-key-for-vim":1,
        "asx-snippets-for-vim":1,
        "vim-for-cpp-dev":1,
        "vim-fonts":1,
        "let-vim-to-access-remove-resources":1,
        "humility":1,
        "jingmi-tea":1,
        "use-vim-view-html-src":1,
        "blogday-2009":1,
        "crazy-performance":1,
        "menu-item-icons":1,
        "css-names-with-cn-en-unicode":1,
        "duplicate-bookmarks":1,
        "css-code-style":1,
        "web-design-for-feature":1,
        "talk-about-popup-window":1,
        "search-expreience":1,
        "particulars-of-right-click-menu":1,
        "upgrad-your-browser":1,
        "the-god-of-editor":1,
        "form-design-for-unknow-options":1,
        "status-pattern":1,
        "tags-pattern":1,
        "crumb-navigation":1,
        "menu-button-improved":1,
        "how-to-peel-pencil":1,
        "lift-button-design":1,
        "after-written-examination":1,
        "whitehousegov-in-singapore":1,
        "idea-from-email-srot":1,
        "dignity":1,
        "after-nterview":1,
        "ghost-hand":1,
        "strange-dream":1,
        "gmail-labs-multiple-inboxes":1,
        "remove-msn-9-ad":1,
        "javascript-vars-scope":1,
        "open-basketball-field":1,
        "family-tree-builder-3-released":1
    };
    var path = location.pathname;
    if(!("/"==path || "/index.html"==path || /\/archive-\d{4}\.html$/.test(path) || "/blog/"==path || "/blog/index.html"==path)){
        var p=path.replace(/.*\/([a-zA-Z0-9_-]+)\.html$/, "$1"),
            b=(p in Er && 1==Er[p]);
        initComment(p, b);
    }else{
        initCommentCount(Er);
    }

})();

/**
 * var disqus_identifier; [Optional but recommended: Define a unique identifier (e.g. post id or slug) for this thread]
 */
var disqus_shortname = 'hotoo';
function initCommentCount(Er){
    var cont=$("container");
    var a=cont.getElementsByTagName("a");
    for(var i=a.length-1,disqus_url; i>=0; i--){
        if(a[i].parentNode.tagName.toLowerCase()!="li"){continue;}
        var cmt=document.createElement("a");
        cmt.className="comment-count";
        var path=a[i].pathname,
            p=path.replace(/.*\/([a-zA-Z0-9_-]+)\.html$/, "$1"),
            b=(p in Er && 1==Er[p]);
        disqus_url = b?"http://hotoo.github.com/blog"+path : path;
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

function initComment(p, b){
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://hotoo.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}
