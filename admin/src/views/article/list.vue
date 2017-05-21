<template>
  <div>article list {{hitokoto}}</div>
</template>

<script type="text/ecmascript-6">
  import Hitokoto from 'services/hitokoto';
  export default {
    data() {
      return {
        hitokoto: ''
      };
    },
    mounted() {
      Hitokoto.get()
        .then(response => {
          this.hitokoto = JSON.stringify(response.data.content);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
