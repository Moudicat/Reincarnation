<template>
  <Layout>
    <div slot="content" class="bangumi">
      <el-table
        :data="bangumiListData"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border>
        <el-table-column
          prop="name"
          label="番名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="episode"
          label="所看集数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="最后日期"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="isDone"
          label="OK"
          width="60">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="评价">
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script type="text/ecmascript-6">
  import Layout from 'views/layout';

  export default {
    data() {
      return {
        bangumiListData: [
          {
            name: '从零开始的魔法书',
            episode: 4,
            date: '2017-04-25',
            isDone: 'F',
            comment: '哈哈哈'
          },
          {
            name: '埃罗芒阿老师',
            episode: 4,
            date: '2017-04-24',
            isDone: 'F',
            comment: '哈哈哈111'
          },
          {
            name: '埃罗芒阿老师1',
            episode: 32,
            date: '2017-04-22',
            isDone: 'Y',
            comment: 'test  test long ~test  test long ~test  test long ~test  test long ~test  test long ~test  test long ~'
          }
        ]
      };
    },
    components: {
      Layout
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
