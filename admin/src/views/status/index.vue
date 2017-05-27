<template>
  <div>
    <ul>
      <li v-for="(value, index) in values" :key="index">
        <el-select
          v-model="value"
          filterable
          allow-create
          placeholder="请选择状态标签">
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        options: [{
          name: '目前所在地'
        }, {
          name: '最近的状态'
        }, {
          name: '最近看的番'
        }],
        values: ['目前所在地', '最近的状态', '最近看的番']
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
