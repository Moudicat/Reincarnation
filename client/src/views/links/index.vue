<template>
  <Layout :isFullScreen="true">
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
        <li @click.stop="handleAdd()" :class="{'active': isEditing}">
          <dl class="links">
            <dd v-if="!isEditing">
              <h3>点此添加友链</h3>
              <h4></h4>
              <p>可以在这里留下你的信息</p>
            </dd>

            <dd v-else class="link-input-wrapper">
              <el-input v-model="newLink.name" size="small" :autofocus="true" :maxlength="20">
                <template slot="prepend">请输入您的称呼</template>
              </el-input>
              <el-input v-model="newLink.content" size="small" :maxlength="100">
                <template slot="prepend">请输入您的网址</template>
              </el-input>
              <div class="button-group">
                <button class="confirm" @click.stop="submit()">提交</button>
                <button class="cancel" @click.stop="cancelCreateLink()">取消</button>
              </div>
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
  import Gugu from 'services/gugu';

  export default {
    data() {
      return {
        linkList: [],
        isEditing: false,
        newLink: {
          name: '',
          content: ''
        }
      };
    },
    methods: {
      handleOpen(addr) {
        window.open(addr);
      },

      handleAdd() {
        this.isEditing = true;
      },

      cancelCreateLink() {
        console.log(this.isEditing);
        this.isEditing = false;
        console.log(this.isEditing);
      },

      submit() {
        if (!this.newLink.name.trim() || !this.newLink.content.trim() || this.newLink.name.length > 20 || this.newLink.content.length > 200) {
          this.$alert('请检查您的输入 _(:з」∠)_');
          return;
        }
        this.newLink.type = 'text';
        Gugu.send(this.newLink)
          .then(() => {
            this.isEditing = false;
            this.newLink.name = '';
            this.newLink.content = '';
            this.$message.success('发送成功，会尽快查阅~');
          })
          .catch(err => {
            if (err.message === '403' || err.message === '401') {
              this.$alert('抱歉，发送失败，请联系管理员。');
            }
            this.newLink.name = '';
            this.newLink.content = '';
            this.cancelCreateLink();
          });
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
      flex: 0 0 30%;
      padding: 7px;
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
        border: 14px solid;
        border-image: url('./img/border-image.png') 42;
        color: #fff; // rgba
        dt {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
          margin-left: 10px;
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
          p {
            font-size: 14px;
          }
        }
        .link-input-wrapper {
          margin-left: 0;
          .el-input {
            margin-bottom: 10px;
          }

          .button-group {
            text-align: right;
            button {
              padding: 10px 20px;
              border-radius: 2px 2px 0 0;
              font-size: 14px;
              transition: .4s;
              cursor: pointer;
              user-select: none;
            }
            .confirm {
              &:hover {
                background-color: #79d1ff;
              }
            }
            .cancel {
              &:hover {
                background-color: #ff908e;
              }
            }
          }

        }
      }
      &:hover {
        background-color: rgba(0, 0, 0, .6);
        transform: scale(1.02);
        box-shadow: $primary-boxshadow;
      }

      &.active {
        height: 155px;
      }
    }
  }
</style>
