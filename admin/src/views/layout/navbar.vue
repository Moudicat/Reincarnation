<template>
  <el-menu mode="horizontal" class="navbar" :router="true">
    <el-submenu index="1" class="user-info">
      <template slot="title">{{$store.state.user.username ? $store.state.user.username : '未登录用户'}}</template>
      <el-menu-item index="/settings">个人设置</el-menu-item>
      <el-menu-item index="/login" @click="logout">注销</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      logout() {
        alert('退出登陆');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .navbar {
    flex: 0 0 60px;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .5);
    .user-info {
      position: absolute;
      right: 35px;
    }
  }

</style>
