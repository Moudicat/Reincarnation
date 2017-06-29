<template>
  <div>
    <ul>
      <li class="status-li" v-for="(value, index) in values" :key="index">
        <el-select
          v-model="values[index]"
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
        <el-input v-model="valuesInput[index]" placeholder="请输入内容" class="status-input"></el-input>
        <el-input v-model="valuesNumInput[index]" placeholder="请输入数字" class="status-input"></el-input>
      </li>
      <el-button type="primary" @click="handleAddStatus">添加状态</el-button>
      <el-button type="primary" @click="handleDelStatus">删除状态</el-button>
      <el-button type="success" @click="handleSubmit">提交</el-button>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Status from 'services/status';
  export default {
    data() {
      return {
        options: [{
          name: '目前所在地'
        }, {
          name: '最近的状态'
        }],
        values: ['目前所在地', '最近的状态'],
        valuesInput: ['', ''],
        valuesNumInput: ['', '']
      };
    },
    methods: {
      handleAddStatus() {
        this.values.push('');
        this.valuesInput.push('');
        this.valuesNumInput.push('');
      },
      handleDelStatus() {
        this.values.pop();
        this.valuesInput.pop();
        this.valuesNumInput.pop();
      },
      handleSubmit() {
        if (this.valuesInput.every(e => e) && this.values.every(e => e)) {
          let arr = this.values.map((e, index) => {
            if (this.valuesNumInput[index]) {
              return {
                name: e,
                content: this.valuesInput[index],
                num: parseInt(this.valuesNumInput[index])
              };
            } else {
              return {
                name: e,
                content: this.valuesInput[index]
              };
            }
          });
          Status.update(arr)
            .then(response => {
              if (!response.code) {
                this.$message({
                  message: response.msg,
                  type: 'success'
                });
                this.values = ['目前所在地', '最近的状态', '当前博客版本'];
                this.valuesInput = ['', '', ''];
                this.valuesNumInput = ['', '', ''];
              }
            })
            .catch(err => {
              this.$message({
                message: err.message,
                type: 'error'
              });
            });
        } else {
          alert('no!');
        }
      }
    },
    beforeMount() {
      Status.get()
        .then(response => {
          if (response.data.status.length !== 0) {
            this.values.splice(0, this.values.length);
            this.valuesInput.splice(0, this.valuesInput.length);
            this.valuesNumInput.splice(0, this.valuesNumInput.length);
            response.data.status.forEach(e => {
              if (e.name !== '最近看的番') {
                this.values.push(e.name);
                this.valuesInput.push(e.content);
                this.valuesNumInput.push(e.num ? e.num : '');
              }
            });
            this.$message('加载完毕~');
          }
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: 'error'
          });
        });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .status-li {
    margin: 20px 0;

    .status-input {
      width: 24%;
      &:nth-child(3) {
        width: 8%;
      }
    }
  }
</style>
