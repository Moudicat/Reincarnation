<template>
  <section class="article-section">
    <article :class="{'active': articleMode}">
      <button class="go-back" @click="handleBack"></button>
      <h2 class="article-title" v-show="articleObj.title">{{articleObj.title}}</h2>
      <p class="article-time" v-show="articleObj.postTime"><i class="icon-clock"></i>
        <time>{{articleObj.postTime | time}}</time>
        <i class="icon-history"></i>
        <time>{{articleObj.modifiedTime | time}}</time>
      </p>
      <!-- TODO: 各种信息的展示 -->
      <div class="markdown-body content" v-html="article" v-if="article"></div>
      <div class="markdown-body content" v-else>
        <h1>加载中~</h1>
      </div>

      <div class="copyright">

      </div>
      <div class="back-btn" @click="handleBack"><i class="icon icon-home3"></i> 返回首页</div>
    </article>

    <div id="disqus_thread"></div>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
  </section>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import Article from 'services/article';
  import { formatDate, supportWebp } from 'services/utils';
  let hljs = require('highlight.js');

  let md = require('markdown-it')({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {
        }
      }
      return ''; // use external default escaping
    },
    html: true // Enable HTML tags in source
  });

  let defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    let aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']);
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank';
    }

    return defaultRender(tokens, idx, options, env, self);
  };

  let defaultImageRender = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, options, env, slf) {
    let token = tokens[idx];

    if (supportWebp()) {
      token.attrs[token.attrIndex('src')][1] += '?x-oss-process=style/webp';
    }

    return defaultImageRender(tokens, idx, options, env, slf);
  };

  export default {
    name: 'Article',
    data() {
      return {
        articleObj: {},
        article: '',
        articleMode: false
      };
    },
    methods: {
      handleBack() {
        this.articleMode = false;
        setTimeout(() => {
          this.$router.push('/'); // don't use back  cause disqus
        }, 420);
      }
    },
    filters: {
      time(data) {
        return formatDate(new Date(data), 'yyyy-MM-dd hh:mm');
      }
    },
    mounted() {
      this.$store.commit('header/SET_AVATAR', true);
      this.$store.commit('header/SET_ARTICLEMODE', true);
      if (!this.$route.params.id) {
        alert('非法操作');
      } else {
        Article.getOne(this.$route.params.id)
          .then(response => {
            this.articleObj = response.data;
            this.article = md.render(response.data.content);
            this.articleMode = true;
          })
          .catch(err => {
            // this.article = '<h1>加载失败...请联系管理员</h1>';
            console.log(err);
            this.$router.push('/404');
          });
      }

      // disqus
      var disqus_config = function () {
        this.page.url = location.href;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = this.$route.params.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      
      (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://moudicat.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();

    },
    beforeDestroy() {
      this.$store.commit('header/SET_AVATAR', false);
      this.$store.commit('header/SET_ARTICLEMODE', false);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  article {
    position: relative;
    flex: 1;
    width: 100%;
    max-width: 1190px;
    margin: 20px auto;
    border-radius: 4px;
    background-color: #fff;
    transition: .4s;
    overflow: hidden;
    &.active {
      transform: translateY(-200px) translateZ(0);
      box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
    }
    .go-back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0;
      background: none;
      border-left: 50px solid #ffbb9d;
      border-bottom: 50px solid transparent;
      border-right: 0;
      border-top: 0;
      border-radius: 0 !important;
      cursor: pointer;
      &::before {
        position: absolute;
        left: -44px;
        top: 5px;
        content: '\e90d';
        font-family: 'icomoon';
        font-size: 18px;
        color: #fff;
      }
    }
    .article-title,
    .article-time {
      text-align: center;
    }
    .article-title {
      margin: 20px 0;
      font-size: 30px;
      font-weight: 700;
    }
    .article-time {
      font-size: 12px;
      i {
        margin-right: 5px;
      }
      i:nth-of-type(2) {
        margin-left: 20px;
      }
      > * {
        vertical-align: middle;
      }
    }
  }

  #disqus_thread {
    max-width: 1190px;
    margin: -180px auto 0;
  }

  .back-btn {
    border-top: 1px dashed #24292e;
    line-height: 80px;
    text-align: center;
    cursor: pointer;
  }

  @font-face {
    font-family: octicons-link;
    src: url(data:font/woff;charset=utf-8;base64,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) format('woff');
  }

  .markdown-body {
    padding: 20px 180px 100px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
    time {
      text-align: center;
    }
  }

  .markdown-body .pl-c {
    color: #969896;
  }

  .markdown-body .pl-c1,
  .markdown-body .pl-s .pl-v {
    color: #0086b3;
  }

  .markdown-body .pl-e,
  .markdown-body .pl-en {
    color: #795da3;
  }

  .markdown-body .pl-smi,
  .markdown-body .pl-s .pl-s1 {
    color: #333;
  }

  .markdown-body .pl-ent {
    color: #63a35c;
  }

  .markdown-body .pl-k {
    color: #a71d5d;
  }

  .markdown-body .pl-s,
  .markdown-body .pl-pds,
  .markdown-body .pl-s .pl-pse .pl-s1,
  .markdown-body .pl-sr,
  .markdown-body .pl-sr .pl-cce,
  .markdown-body .pl-sr .pl-sre,
  .markdown-body .pl-sr .pl-sra {
    color: #183691;
  }

  .markdown-body .pl-v,
  .markdown-body .pl-smw {
    color: #ed6a43;
  }

  .markdown-body .pl-bu {
    color: #b52a1d;
  }

  .markdown-body .pl-ii {
    color: #f8f8f8;
    background-color: #b52a1d;
  }

  .markdown-body .pl-c2 {
    color: #f8f8f8;
    background-color: #b52a1d;
  }

  .markdown-body .pl-c2::before {
    content: "^M";
  }

  .markdown-body .pl-sr .pl-cce {
    font-weight: bold;
    color: #63a35c;
  }

  .markdown-body .pl-ml {
    color: #693a17;
  }

  .markdown-body .pl-mh,
  .markdown-body .pl-mh .pl-en,
  .markdown-body .pl-ms {
    font-weight: bold;
    color: #1d3e81;
  }

  .markdown-body .pl-mq {
    color: #008080;
  }

  .markdown-body .pl-mi {
    font-style: italic;
    color: #333;
  }

  .markdown-body .pl-mb {
    font-weight: bold;
    color: #333;
  }

  .markdown-body .pl-md {
    color: #bd2c00;
    background-color: #ffecec;
  }

  .markdown-body .pl-mi1 {
    color: #55a532;
    background-color: #eaffea;
  }

  .markdown-body .pl-mc {
    color: #ef9700;
    background-color: #ffe3b4;
  }

  .markdown-body .pl-mi2 {
    color: #d8d8d8;
    background-color: #808080;
  }

  .markdown-body .pl-mdr {
    font-weight: bold;
    color: #795da3;
  }

  .markdown-body .pl-mo {
    color: #1d3e81;
  }

  .markdown-body .pl-ba {
    color: #595e62;
  }

  .markdown-body .pl-sg {
    color: #c0c0c0;
  }

  .markdown-body .pl-corl {
    text-decoration: underline;
    color: #183691;
  }

  .markdown-body .octicon {
    display: inline-block;
    vertical-align: text-top;
    fill: currentColor;
  }

  .markdown-body a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  .markdown-body a:active,
  .markdown-body a:hover {
    outline-width: 0;
  }

  .markdown-body strong {
    font-weight: inherit;
  }

  .markdown-body strong {
    font-weight: bolder;
  }

  .markdown-body h1 {
    text-align: center;
    font-size: 2em;
    margin: 0.67em 0;
  }

  .markdown-body img {
    display: block;
    margin: 0 auto;
    box-shadow: $secondary-boxshadow;
    border-style: none;
  }

  .markdown-body svg:not(:root) {
    overflow: hidden;
  }

  .markdown-body code,
  .markdown-body kbd,
  .markdown-body pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  .markdown-body hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  .markdown-body input {
    font: inherit;
    margin: 0;
  }

  .markdown-body input {
    overflow: visible;
  }

  .markdown-body [type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
  }

  .markdown-body * {
    box-sizing: border-box;
  }

  .markdown-body input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .markdown-body a {
    color: #0366d6;
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body strong {
    font-weight: 600;
  }

  .markdown-body hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
  }

  .markdown-body hr::before {
    display: table;
    content: "";
  }

  .markdown-body hr::after {
    display: table;
    clear: both;
    content: "";
  }

  .markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  .markdown-body td,
  .markdown-body th {
    padding: 0;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body h1 {
    font-size: 32px;
    font-weight: 600;
  }

  .markdown-body h2 {
    font-size: 24px;
    font-weight: 600;
  }

  .markdown-body h3 {
    font-size: 20px;
    font-weight: 600;
  }

  .markdown-body h4 {
    font-size: 16px;
    font-weight: 600;
  }

  .markdown-body h5 {
    font-size: 14px;
    font-weight: 600;
  }

  .markdown-body h6 {
    font-size: 12px;
    font-weight: 600;
  }

  .markdown-body p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .markdown-body blockquote {
    margin: 0;
  }

  .markdown-body ul,
  .markdown-body ol {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body ol ol,
  .markdown-body ul ol {
    list-style-type: lower-roman;
  }

  .markdown-body ul ul ol,
  .markdown-body ul ol ol,
  .markdown-body ol ul ol,
  .markdown-body ol ol ol {
    list-style-type: lower-alpha;
  }

  .markdown-body dd {
    margin-left: 0;
  }

  .markdown-body code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12px;
  }

  .markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
    font: 12px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }

  .markdown-body .octicon {
    vertical-align: text-bottom;
  }

  .markdown-body .pl-0 {
    padding-left: 0 !important;
  }

  .markdown-body .pl-1 {
    padding-left: 4px !important;
  }

  .markdown-body .pl-2 {
    padding-left: 8px !important;
  }

  .markdown-body .pl-3 {
    padding-left: 16px !important;
  }

  .markdown-body .pl-4 {
    padding-left: 24px !important;
  }

  .markdown-body .pl-5 {
    padding-left: 32px !important;
  }

  .markdown-body .pl-6 {
    padding-left: 40px !important;
  }

  .markdown-body::before {
    display: table;
    content: "";
  }

  .markdown-body::after {
    display: table;
    clear: both;
    content: "";
  }

  .markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  .markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .markdown-body .anchor:focus {
    outline: none;
  }

  .markdown-body p,
  .markdown-body blockquote,
  .markdown-body ul,
  .markdown-body ol,
  .markdown-body dl,
  .markdown-body table,
  .markdown-body pre {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .markdown-body hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
  }

  .markdown-body blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid $divider-color;
  }

  .markdown-body blockquote > :first-child {
    margin-top: 0;
  }

  .markdown-body blockquote > :last-child {
    margin-bottom: 0;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .markdown-body h1 .octicon-link,
  .markdown-body h2 .octicon-link,
  .markdown-body h3 .octicon-link,
  .markdown-body h4 .octicon-link,
  .markdown-body h5 .octicon-link,
  .markdown-body h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
  }

  .markdown-body h1:hover .anchor,
  .markdown-body h2:hover .anchor,
  .markdown-body h3:hover .anchor,
  .markdown-body h4:hover .anchor,
  .markdown-body h5:hover .anchor,
  .markdown-body h6:hover .anchor {
    text-decoration: none;
  }

  .markdown-body h1:hover .anchor .octicon-link,
  .markdown-body h2:hover .anchor .octicon-link,
  .markdown-body h3:hover .anchor .octicon-link,
  .markdown-body h4:hover .anchor .octicon-link,
  .markdown-body h5:hover .anchor .octicon-link,
  .markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  .markdown-body h1 {
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #eaecef;
  }

  .markdown-body h3 {
    font-size: 1.25em;
  }

  .markdown-body h4 {
    font-size: 1em;
  }

  .markdown-body h5 {
    font-size: 0.875em;
  }

  .markdown-body h6 {
    font-size: 0.85em;
    color: #6a737d;
  }

  .markdown-body ul,
  .markdown-body ol {
    padding-left: 2em;
  }

  .markdown-body ul ul,
  .markdown-body ul ol,
  .markdown-body ol ol,
  .markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body li > p {
    margin-top: 16px;
  }

  .markdown-body li + li {
    margin-top: 0.25em;
  }

  .markdown-body dl {
    padding: 0;
  }

  .markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .markdown-body table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .markdown-body table th {
    font-weight: 600;
  }

  .markdown-body table th,
  .markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .markdown-body table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
  }

  .markdown-body code {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  .markdown-body code::before,
  .markdown-body code::after {
    letter-spacing: -0.2em;
    content: "\00a0";
  }

  .markdown-body pre {
    word-wrap: normal;
  }

  .markdown-body pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .markdown-body .highlight {
    margin-bottom: 16px;
  }

  .markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  .markdown-body pre code {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .markdown-body pre code::before,
  .markdown-body pre code::after {
    content: normal;
  }

  .markdown-body .full-commit .btn-outline:not(:disabled):hover {
    color: #005cc5;
    border-color: #005cc5;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fcfcfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
  }

  .markdown-body :checked + .radio-label {
    position: relative;
    z-index: 1;
    border-color: #0366d6;
  }

  .markdown-body .task-list-item {
    list-style-type: none;
  }

  .markdown-body .task-list-item + .task-list-item {
    margin-top: 3px;
  }

  .markdown-body .task-list-item input {
    margin: 0 0.2em 0.25em -1.6em;
    vertical-align: middle;
  }

  .markdown-body hr {
    border-bottom-color: #eee;
  }

  // highlight
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #f8f8f8
  }

  .hljs-comment, .hljs-quote {
    color: #998;
    font-style: italic
  }

  .hljs-keyword, .hljs-selector-tag, .hljs-subst {
    color: #333;
    font-weight: bold
  }

  .hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr {
    color: #008080
  }

  .hljs-string, .hljs-doctag {
    color: #d14
  }

  .hljs-title, .hljs-section, .hljs-selector-id {
    color: #900;
    font-weight: bold
  }

  .hljs-subst {
    font-weight: normal
  }

  .hljs-type, .hljs-class .hljs-title {
    color: #458;
    font-weight: bold
  }

  .hljs-tag, .hljs-name, .hljs-attribute {
    color: #000080;
    font-weight: normal
  }

  .hljs-regexp, .hljs-link {
    color: #009926
  }

  .hljs-symbol, .hljs-bullet {
    color: #990073
  }

  .hljs-built_in, .hljs-builtin-name {
    color: #0086b3
  }

  .hljs-meta {
    color: #999;
    font-weight: bold
  }

  .hljs-deletion {
    background: #fdd
  }

  .hljs-addition {
    background: #dfd
  }

  .hljs-emphasis {
    font-style: italic
  }

  .hljs-strong {
    font-weight: bold
  }
</style>
