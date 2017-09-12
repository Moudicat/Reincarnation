<template>
  <div>
    <ul>
      <el-input class="input-30" v-model="newLink.name" placeholder="名字"></el-input>
      <el-input class="input-30" v-model="newLink.owner" placeholder="拥有者"></el-input>
      <el-input class="input-30" v-model="newLink.avatar" placeholder="头像"></el-input>
      <el-input class="input-30" v-model="newLink.address" placeholder="地址"></el-input>
      <el-input class="input-30" v-model="newLink.description" placeholder="描述"></el-input>
      <el-button class="input-30" type="primary" @click="handleAdd">添加</el-button>
    </ul>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" class="margin-top">
      <el-table-column width="120px" align="center" label="发布时间">
        <template scope="scope">
          <span>{{scope.row.date | formatDate(scope.row.date)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="名字">
        <template scope="scope">
          <span class="link-type">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="拥有者">
        <template scope="scope">
          <span class="link-type">{{scope.row.owner}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template scope="scope">
          <span class="link-type">{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template scope="scope">
          <span class="link-type">{{scope.row.description}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="操作" width="200">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import Link from 'services/link';
  import { formatDate } from 'services/utils';

  export default {
    data() {
      return {
        newLink: {
          name: '',
          owner: '',
          avatar: '',
          address: '',
          description: ''
        },
        list: [],
        listLoading: true
      };
    },
    methods: {
      handleAdd() {
        if (Object.values(this.newLink).every(e => e)) {
          Link.add(this.newLink)
            .then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              });
              this.newLink = {
                name: '',
                owner: '',
                avatar: '',
                address: '',
                description: ''
              };
              this.refresh();
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
        } else {
          this.$message('有没填写的项呢');
        }
      },
      handleDelete(id) {
        Link.remove(id)
          .then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.refresh();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.message);
          });
      },
      refresh() {
        Link.get()
          .then(response => {
            if (response.data && response.data.length) {
              this.list = response.data;
              this.listLoading = false;
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
        return formatDate(new Date(date), 'yyyy-MM-dd');
      }
    },
    beforeMount() {
      this.refresh();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .input-30 {
    width: 30%;
    margin-bottom: 10px;
  }
</style>
