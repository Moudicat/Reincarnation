<template>
  <Layout>
    <div slot="content" class="links-wrapper">
      <ul class="links-list">
        <li v-for="(link, index) in linkList" :key="index" @click.stop="handleOpen(link.address)">
          <dl class="links">
            <dt>
              <img
                :src="link.avatar"
                :alt="link.owner">
            </dt>
            <dd>
              <h3>{{ link.name }}</h3>
              <h4>{{ link.address }}</h4>
              <p>{{ link.description }}</p>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script type="text/ecmascript-6">
  import Layout from 'views/layout';
  import Link from 'services/link';

  export default {
    data() {
      return {
        linkList: []
      };
    },
    methods: {
      handleOpen(addr) {
        window.open(addr);
      }
    },
    beforeMount() {
      Link.list()
        .then(response => {
          if (response.data.length) {
            this.linkList = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      transition: .2s;
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
          h4 {
            display: none;
          }
        }
      }
      &:hover {
        background-color: rgba(0, 0, 0, .6);
        transform: scale(1.02);
        box-shadow: $primary-boxshadow;
      }
    }
  }
</style>
