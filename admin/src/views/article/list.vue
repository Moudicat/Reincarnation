<template>
  <div>
    <div class="ctrl-bar">
      <el-button type="danger" @click="handleDeleteMark">删除标记删除的文章</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column width="180px" align="center" label="发布时间">
        <template scope="scope">
          <span>{{scope.row.postTime | formatDate(scope.row.postTime)}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="修改时间">
        <template scope="scope">
          <span>{{scope.row.modifiedTime | formatDate(scope.row.modifiedTime)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题">
        <template scope="scope">
          <span class="link-type">{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="作者">
        <template scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="操作" width="200">
        <template scope="scope">
          <el-button v-if="scope.row.status != 'publish'" size="small" type="success" @click="handleModifyStatus(scope.row,'publish')">发布
          </el-button>
          <el-button v-if="scope.row.status != 'draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button size="small" @click="handleModify(scope.row._id)" type="warning">编辑</el-button>
          <el-button v-if="scope.row.status != 'delete'" size="small" type="danger" @click="handleModifyStatus(scope.row,'delete')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import Article from 'services/article';
  import { formatDate } from 'services/utils';

  export default {
    data() {
      return {
        listLoading: false,
//        title: String,
//        author: String,
//        postTime: String,
//        modifiedTime: String,
//        status: String,
//        description: String,
//        banner: String,
//        content: String
        list: []
      };
    },
    methods: {
      refresh() {
        Article.listAll()
          .then(response => {
            console.log(response);
            this.list = response.data;
          })
          .catch(err => {
            console.log(err.message);
          });
      },
      handleModifyStatus(article, status) {
        Article.setStatus(article._id, status)
          .then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.refresh();
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      },
      handleDeleteMark() {
        Article.remove()
          .then(response => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.refresh();
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      },
      handleModify(id) {
        this.$store.commit('SET_AMI', id);
        setTimeout(() => {
          this.$router.push('/article/new');
        }, 1000);
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          publish: 'success',
          draft: 'gray',
          delete: 'danger'
        };
        return statusMap[status];
      },
      formatDate(date) {
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss');
      }
    },
    mounted() {
      this.refresh();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .ctrl-bar {
    padding: 0 20px 20px;
  }
</style>
