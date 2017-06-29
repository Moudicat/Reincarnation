<template>
  <Layout>
    <div slot="content" class="links-wrapper">
      <ul class="links-list">
        <li>
          <dl class="links">
            <dt>
              <img
                src="data:image/jpeg;base64,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"
                alt="">
            </dt>
            <dd>
              <h3>某迪猫</h3>
              <p>结束与起始之界</p>
            </dd>
          </dl>
        </li>
        <li>
          <dl class="links">
            <dt>
              <img
                src="https://i0.hdslb.com/bfs/bangumi/e5317e4fa45ff7b1236ba5a558bd2beff624bc7a.jpg@72w_72h.webp"
                alt="">
            </dt>
            <dd>
              <h3>岛风</h3>
              <p>/斜眼笑</p>
            </dd>
          </dl>
        </li>
      </ul>
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
  .links-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 20px;
    background-size: contain;
    li {
      flex: 0 0 45%;
      padding: 10px;
      margin-top: 20px;
      border-radius: 10px;
      background-color: rgba(59, 60, 61, 0.5);
      transition: .3s;
      cursor: pointer;
      .links {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0;
        border: 20px solid;
        border-image: url('./img/border-image.png') 42;
        color: #fff; // rgba
        dt {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
          margin-left: 20px;
          overflow: hidden;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          flex: 1;
          height: 80px;
          margin-left: 20px;
          h3 {
            font-size: 20px;
            margin-bottom: 10px;
          }
        }
      }
      &:hover {
        background-color: rgba(0, 0, 0, .6);
        transform: scale(1.1);
        box-shadow: 0 0 10px 1px #ffae12;
      }
    }
  }
</style>
