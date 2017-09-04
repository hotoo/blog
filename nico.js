'use strict';

module.exports = {
  'sitename': '闲耘™.博客',
  'siteurl': 'http://blog.hotoo.me',
  'source': 'content',
  'output': '_site',
  'theme': 'theme',
  'google': 'UA-2048484-1',
  'permalink': 'post/{{filename}}',
  'navigation': [
    {
      'link': 'http://hotoo.me/',
      'title': 'Home',
    },
    {
      'link': '/',
      'title': 'Blog',
      'active': true,
    },
    {
      'link': 'http://wiki.hotoo.me/',
      'title': 'Wiki',
    },
    {
      'link': 'http://wiki.hotoo.me/Vim.html',
      'title': 'Vim',
    },
    {
      'link': 'http://twitter.hotoo.me/',
      'title': 'Twitter',
    },
    {
      'link': 'https://github.com/hotoo',
      'title': 'Project',
    },
    // {
      // 'link': '/resume/resume.html',
      // 'title': 'ABOUT'
    // },
  ],
  'writers': [
    'nico.PageWriter',
    'nico.PostWriter',
    'nico.FileWriter',
    'nico.StaticWriter',
    'nico.YearWriter',
    // 'nico.TagWriter',
    'nico.TagCloudWriter',
    'nico.FeedWriter',
  ],
  'feedurl': '/feed.xml',
  'filters': {
    // format permalink, ends without .html, .md
    'fixlink': function(html) {
      html = html.replace(/(href="[^"]+)\.md(">)/ig, '$1$2');
      return html;
    },
    'disqus_identifier': function(uri) {
      return uri.replace(/\.html$/, '');
    },
    'fixresource': function(html) {
      html = html.replace(/\bsrc=(["'])(.*?)\1/, function($0, $1_quot, $2_src) {
        if ($2_src.test(/^[\/\.]/)) {
          $2_src = this.siteurl + $2_src;
        }
        return $2_src;
      });
    },
    // less content in index page.
    'less': function(html, url, moreLinkText) {
      const parts = html.split(/<!--\s*more\s*-->/);
      html = parts[0];
      if (parts.length > 1) {
        html += '<p class="more"><a href="' + url + '#more">' + moreLinkText + '</a></p>';
      }
      return html;
    },
    // more content in detail page.
    'more': function(html) {
      return html.replace(/<!--\s*more\s*-->/, '<a name="more"></a>');
    },
    // get public posts.
    'public': function(posts) {
      return posts.filter(function(item) {
        return item.meta.status === 'public' || !item.meta.status;
      });
    },
    // code line format.
    'codeline': function(html) {
      let snipIndex = 1;
      return html.replace(/(?:<!--\s*baseline[=:](\d+);?\s*-->)?\s*(?:<div class="highlight">)?(<pre>[\s\S]*?<\/pre>)(?:<\/div>)?/gm,
      function($0, startLine, codes) {

        if (!startLine) {
          startLine = 1;
        } else {
          startLine = parseInt(startLine, 10);
        }
        const htmlines = [];
        const lines = codes.split(/(?:\r\n|\r|\n)/).length;
        for (let i = startLine, l = startLine + lines; i < l; i++) {
          htmlines.push('<a name="L' + snipIndex + '-' + i + '" href="#L' + snipIndex + '-' + i + '">' + i + '</a>');
        }

        snipIndex++;
        return '<div class="highlight">' +
          '<div class="codes">' +
          '<div class="code">' + codes + '</div>' +
          '<pre class="line">' + htmlines.join('\n') + '</pre>' +
          '</div>' +
          '</div>';
      });
    },
  },
};
