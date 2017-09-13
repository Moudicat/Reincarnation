<template>
  <li class="article-list-item">
    <h3 @click="handleOpenArticle">{{article.title}}<span></span></h3>
    <time><i class="icon-clock"></i> {{article.postTime | time}}</time>
    <p class="desc">{{article.description}}</p>
    <div class="pic-wrapper">
      <img v-lazy="article.banner" alt="article-pic" class="pic" @click.stop="handlePicClick">
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from 'services/utils';
  export default {
    name: 'articleListItem',
    props: {
      article: Object
    },
    data() {
      return {};
    },
    methods: {
      handlePicClick(ev) {
        const wrapper = ev.target.parentNode;
        const height = getComputedStyle(wrapper).height;
        const targetHeight = getComputedStyle(ev.target).height;
        if (Math.ceil(parseFloat(height)) >= parseFloat(targetHeight)) {
          wrapper.style.maxHeight = '340px';
        } else {
          wrapper.style.maxHeight = targetHeight;
        }
      },
      handleOpenArticle() {
        this.$router.push('/article/' + this.article._id);
      }
    },
    filters: {
      time(data) {
        return formatDate(new Date(data), 'yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .article-list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
    padding: 20px 30px;
    border-bottom: 1px solid #e6ecf0;
    background: url('./img/cat_hidden.svg') right bottom -13px no-repeat;
    transition: .4s cubic-bezier(.75,.22,.24,.94);
    text-align: center;
    &:hover {
      background-color: #f8f9ff;
      background-position: right bottom;
    }
    > h3 {
      position: relative;
      padding: 10px;
      font-size: 30px;
      color: $primary-text;
      transition: .3s;
      cursor: pointer;
      &::before, &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        width: 0;
        transition: .4s .4s;
      }
      &::after {
        left: inherit;
        top: inherit;
        right: 0;
        bottom: 0;
      }
      &:hover::before, &:hover::after {
        width: 3%;
        background-color: #ff9f71;
        transition: .3s;
      }
      &:hover {
        background-color:$primary-background;
        color: #ef3d13;
        box-shadow: 1px 3px 5px 2px #eee;
        > span::before, > span::after {
          height: 50%;
          background-color: #ff9f71;
          transition: .2s;
        }
      }
      > span {
        &::before, &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 0;
          width: 2px;
          transition: .4s;
        }
        &::after {
          left: inherit;
          top: inherit;
          right: 0;
          bottom: 0;
        }
      }
    }
    > time {
      margin: 10px 0 15px 0;
      font-size: 14px;
      color: rgba(50, 50, 50, .7);
      white-space: nowrap;
      > i {
        vertical-align: baseline;
      }
    }
    .desc {
      line-height: 28px;
      text-indent: 2em;
      text-align: left;
    }
    .pic-wrapper {
      max-width: 70%;
      max-height: 340px;
      border-radius: 5px;
      margin: 20px auto;
      border: 1px solid rgba(0, 0, 0, .1);
      overflow: hidden;
      cursor: pointer;
      transition: .3s cubic-bezier(.64, .02, .68, .99);
      .pic {
        width: 100%;
      }
    }
  }
</style>
