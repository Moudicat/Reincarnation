<template>
  <footer>
    <p>
      Powered By
      <a href="https://github.com/moudicat/reincarnation">Reincarnation@Beta</a>
      |
      <img src="https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/beian.png" style="margin-right: 5px;width: 16px;">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=52011502009325" rel="noreferrer" target="_blank">贵公网安备52011502009325</a>
      |
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="nofollow noopener noreferrer"
        >黔ICP备19005521号-1</a
      >
    </p>
    <p>
      Copyright © 2014-{{ new Date().getFullYear() }} 某迪猫 All Rights
      Reserved.
    </p>
  </footer>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="scss" rel="stylesheet/scss">
footer {
  flex: 0 0 170px;
  padding: 40px;
  text-align: center;
  p {
    font-size: 14px;
    padding: 5px 0;
    a {
      color: $primary-text;
    }
  }
}
</style>
