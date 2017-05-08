<template>
  <section class="about-wrapper">
    <aside></aside>
    <div class="about">
      <div class="about-header">
        <ul>
          <li>
            <router-link to="/about/index">关于本站</router-link>
          </li>
          <li>
            <router-link to="/about/release-note" @click.native="handleClick">Release Note</router-link>
          </li>
        </ul>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .about-wrapper {
    display: flex;
    flex: auto;
    width: 100%;
    max-width: 1190px;
    margin: 0 auto;
    aside {
      flex: 0 0 25.2%;
      margin: 45px 10px 5px 0;
    }
    .about {
      margin: 10px 0 5px 5px;
      flex: 1;
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
  }
</style>
