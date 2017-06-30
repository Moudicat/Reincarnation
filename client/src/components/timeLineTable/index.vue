<template>
  <el-table :data="timeLineData" width="100%">
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="desc" label="说明"></el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        timeLineData: [
          {
            date: '2009年6月28日',
            desc: '于香港的免费空间写出了第一句HTML'
          },
          {
            date: '2010年1月22日',
            desc: '第二个免费主页hrd001.jimido.com上线。但由于高中寄宿放弃了所有网站维护'
          },
          {
            date: '2014年1月26日',
            desc: '注册域名moudicat.com，作为自己的个人网站，起名某迪猫'
          },
          {
            date: '2014年2月24日',
            desc: '在farisl.com网站申请到了新站长免费虚拟主机，终于开始走上正途(x'
          },
          {
            date: '2014年2月25日',
            desc: '搬迁至收费虚拟主机-三号主机'
          },
          {
            date: '2014年4月22日',
            desc: '注册域名kuroneko.cn作为代码实验室'
          },
          {
            date: '2014年10月10日',
            desc: '因三号主机经常无故封停账号。整站搬迁至hostker'
          },
          {
            date: '2014年12月19日',
            desc: '代码实验室搬迁至hostker'
          },
          {
            date: '2015年9月21日',
            desc: '开通阿里云服务器，网站准备迁入国内'
          },
          {
            date: '2015年10月23日',
            desc: '开始moudicat.com域名备案，注册域名mcat.space'
          },
          {
            date: '2015年10月31日',
            desc: '备案通过，网站搬迁至阿里云，开启OSS、CDN服务'
          },
          {
            date: '2016年5月24日',
            desc: '全站启用SSl'
          },
          {
            date: '2016年11月2日',
            desc: '修改网站部分样式'
          },
          {
            date: '2016年11月2日',
            desc: '注册域名 0u0b.com 待用'
          },
          {
            date: '2016年11月2日',
            desc: '修复移动端无法加载OSS文件的问题/修复了部分控制台报错问题/优化加载项'
          },
          {
            date: '2017年5月4日',
            desc: '开始新博客系统的开发'
          },
          {
            date: '2017年5月14日',
            desc: '注册域名say.moe'
          },
          {
            date: '2017年5月29日',
            desc: 'Reincarnation博客系统上线'
          }
        ]
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
