<template>
  <Layout>
    <div slot="content" class="about">
      <div class="about-header">
        <ul>
          <li>
            <router-link to="/about/index">关于本站</router-link>
          </li>
          <li>
            <router-link to="/about/release-note">开发日志</router-link>
          </li>
        </ul>
      </div>
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </Layout>
</template>

<script type="text/ecmascript-6">
  import Layout from 'views/layout';

  export default {
    components: {
      Layout
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .about {
    .about-header {
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #e6ecf0;
      border-radius: 5px 5px 0 0;
      ul {
        display: flex;
        > li {
          padding: 15px 20px;
          font-size: 16px;
          line-height: 1;
          a.active {
            color: #ff9f71;
          }
        }
      }
    }
  }
</style>
