<template>
  <div>
    <ul>
      <el-input class="nh" type="textarea" :rows="2" v-model="newHitokoto" placeholder="请输入新的一言"></el-input>
      <el-button type="primary" @click="handleAdd">添加一言</el-button>
    </ul>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" class="margin-top">
      <el-table-column width="180px" align="center" label="发布时间">
        <template scope="scope">
          <span>{{scope.row.date | formatDate(scope.row.date)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="内容">
        <template scope="scope">
          <span class="link-type">{{scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="操作" width="200">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import Hitokoto from 'services/hitokoto';
  import { formatDate } from 'services/utils';

  export default {
    data() {
      return {
        newHitokoto: '',
        list: []
      };
    },
    methods: {
      handleAdd() {
        if (!this.newHitokoto) {
          Hitokoto.add({content: this.newHitokoto})
            .then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              });
              this.newHitokoto = '';
              this.refresh();
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
        }
      },
      handleDelete(id) {
        Hitokoto.remove(id)
          .then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.message);
          });
      },
      refresh() {
        Hitokoto.getAll()
          .then(response => {
            if (response.data && response.data.length) {
              this.list = response.data;
            }
          })
          .catch(err => {
            this.$message.error(err.message);
            console.log(err);
          });
      }
    },
    filters: {
      formatDate(date) {
        return formatDate(new Date(Number(date)), 'yyyy-MM-dd hh:mm:ss');
      }
    },
    beforeMount() {
      this.refresh();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .nh {
    width: 60%;
  }
</style>
