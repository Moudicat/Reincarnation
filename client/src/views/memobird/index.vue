<template>
  <Layout :hasAside="true">
    <div slot="aside" class="memobird-aside">
      <img src="https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/memobird-help.png" alt="memobird-help">
    </div>
    <div slot="content" class="memobird-wrapper">
      <div class="header">
        To: 某迪
      </div>
      <textarea name="content" id="content" rows="12" v-model="guguObj.content" maxlength="200" placeholder="你有什么想说的呢..."  :disabled="isDisable"></textarea>
      <div class="footer">
        <div class="name">
          <span>你的名字: </span>
          <input type="text" v-model="guguObj.name" :disabled="isDisable">
        </div>

        <button @click="submitHandle">发送</button>
      </div>
    </div>
  </Layout>
</template>

<script type="text/ecmascript-6">
  import Layout from 'views/layout';
  import Gugu from 'services/gugu';

  export default {
    data() {
      return {
        guguObj: {
          content: '',
          name: ''
        },
        isDisable: false
      };
    },
    methods: {
      submitHandle() {
        if (this.isDisable) return;
        if (this.guguObj.content === '') {
          this.$alert('内容未填写');
          return;
        }
        if (this.guguObj.name === '') {
          this.$alert('你的名字未填写');
          return;
        }

        this.isDisable = true;

        this.guguObj.type = 'text';
        Gugu.send(this.guguObj)
          .then(response => {
            this.isDisable = true;
            this.guguObj.name = '';
            this.guguObj.content = '';
            this.$message.success(response.msg);
          })
          .catch(err => {
            this.isDisable = true;
            if (err.message === '403' || err.message === '401') {
              this.$alert('抱歉，当前无法发送： 处于频率限制或在黑名单中。 请一小时后再试。');
            } else if (err.message === '400') {
              this.$alert('参数错误');
            }
          });
      }
    },
    components: {
      Layout
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .memobird-aside {
    position: relative;
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.11), 0 0 4px 0 rgba(0, 0, 0, 0.04);
  }
  .memobird-wrapper {
    border-radius: 6px;
    overflow: hidden;
    .header {
      height: 180px;
      padding: 30px;
      color: #fff;
      font-size: 28px;
      background: url("./img/pic_top.png") no-repeat center;
      background-size: auto 100%;
    }
    #content {
      width: 100%;
      padding: 20px;
      font-size: 18px;
      border: 0;
    }
    .footer {
      position: relative;
      height: 80px;
      background-color: #fff;
      text-align: center;
      .name {
        position: absolute;
        top: 16px;
        left: 10px;
        input {
          display: inline-block;
          height: 40px;
          width: 140px;
          padding: 0 10px;
          font-size: 22px;
          line-height: 40px;
          border: solid #52d8ee;
          border-width: 0 0 2px 0;
        }
      }
      button {
        display: inline-block;
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 22px;
        background-color: #fff;
        border: 2px solid #0fcfcf;
        border-radius: 6px;
        color: #1ccfc9;
        cursor: pointer;
        transition: .4s;
        &:hover {
          color: #fff;
          background-color: #1ccfc9;
        }
      }
    }
  }
</style>
