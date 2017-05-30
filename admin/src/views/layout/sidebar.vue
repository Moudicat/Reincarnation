<template>
  <el-menu defaultActive="/" :defaultOpeneds="['1']" theme="dark" :router="true">
    <el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-document"></i>文章相关</template>
      <el-menu-item-group>
        <el-menu-item index="/article">查看文章</el-menu-item>
        <el-menu-item index="/article/new">写文章</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-information"></i>模块相关</template>
      <el-menu-item-group>
        <el-menu-item index="/status-panel">状态栏</el-menu-item>
        <el-menu-item index="/hitokoto">一言</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
