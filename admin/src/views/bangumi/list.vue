<template>
  <div>
    <ul>
      <el-autocomplete
        v-model="newAnimation.name"
        :fetch-suggestions="querySearch"
        placeholder="请输入番剧名"
        @select="handleSelect"
        class="input p20"
      ></el-autocomplete>
      <el-input v-model="newAnimation.episode" placeholder="请输入集数" class="input"></el-input>
      <el-date-picker
        v-model="newAnimation.date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select v-model="newAnimation.isDone" placeholder="是否看完" class="input">
        <el-option
          v-for="option in options"
          :key="option"
          :label="option"
          :value="option">
        </el-option>
      </el-select>
      <el-input v-model="newAnimation.comment" placeholder="评论" class="input"></el-input>
      <el-button type="primary" @click="handleAdd">添加番剧</el-button>
    </ul>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%"
              class="margin-top">
      <el-table-column label="番名">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="集数">
        <template scope="scope">
          <span>{{scope.row.episode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="最后日期">
        <template scope="scope">
          <span>{{scope.row.date | formatDate(scope.row.date)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否看完">
        <template scope="scope">
          <span>{{scope.row.isDone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论">
        <template scope="scope">
          <span>{{scope.row.comment}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button size="small" @click="handleModify(scope.row._id)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import Animation from 'services/animation';
  import Bangumi from 'services/bangumi';
  import {formatDate} from 'services/utils';
  import debounce from 'lodash/debounce';

  export default {
    data() {
      return {
        newAnimation: {
          id: '',
          name: '',
          episode: '',
          date: '',
          isDone: 'N',
          comment: ''
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        options: ['Y', 'N'],
        list: [],
        listLoading: true
      };
    },
    methods: {
      handleAdd() {
        if (this.newAnimation.name || this.newAnimation.episode || this.newAnimation.date) {
          this.newAnimation.date = +new Date(this.newAnimation.date);
          Animation.add(this.newAnimation)
            .then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              });
              this.newAnimation.id = '';
              this.newAnimation.name = '';
              this.newAnimation.episode = '';
              this.newAnimation.isDone = 'N';
              this.newAnimation.comment = '';
              this.refresh();
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
        } else {
          this.$message('有东西没填呢。。');
        }
      },
      handleDelete(id) {
        if (!id) return;
        Animation.remove(id)
          .then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
          })
          .catch(err => {
            this.$message.error(err.message);
            console.log(err);
          });
        this.refresh();
      },
      handleSelect(item) {
        this.newAnimation.id = item.id;
      },
      refresh() {
        this.listLoading = true;
        Animation.get()
          .then(response => {
            if (response.data && response.data.length) {
              this.list = response.data;
            }
            this.listLoading = false;
          })
          .catch(err => {
            this.$message.error(err.message);
            console.log(err);
            this.listLoading = false;
          });
      },
      querySearch: debounce(function (queryString, cb) {
        if (queryString === '') {
          cb([]);
          return;
        }
        Bangumi.search(queryString)
          .then(response => {
            let arr = [];
            response.data.forEach(e => {
              e.titleTranslate['zh-Hans'].forEach(name => {
                arr.push({value: name, id: e._id});
              });
            });
            cb(arr);
          })
          .catch(err => {
            this.$message.error(err.message);
            console.log(err);
          });
      }, 1000)
    },
    filters: {
      formatDate(date) {
        return formatDate(new Date(Number(date)), 'yyyy-MM-dd');
      }
    },
    beforeMount() {
      this.refresh();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .input {
    width: 15%;
  }
  .p20 {
    width: 20%;
  }
</style>
