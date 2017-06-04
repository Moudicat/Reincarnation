<template>
  <div class=''>
    <el-input
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 15}"
      placeholder="请输入数据"
      v-model="data">
    </el-input>
    <el-button type="primary" @click="handleAdd" class="margin-top">添加番剧</el-button>
  </div>

</template>

<script type="text/ecmascript-6">
  import Bangumi from 'services/bangumi';
  export default {
    data() {
      return {
        data: ''
      };
    },
    methods: {
      handleAdd() {
        let data = null;
        try {
          data = JSON.parse(this.data);
        } catch (err) {
          this.$message.error('格式错误');
          return;
        }
        Bangumi.add(data)
          .then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.data = '';
          })
          .catch(err => {
            this.$message.error(err.message);
            console.log(err);
          });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .CodeMirror {
    height: 50%;
  }
</style>
