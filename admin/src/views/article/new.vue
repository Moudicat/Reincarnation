<template>
  <div>
    <MDInput v-model="article.title" placeholder="请在此处输入文章标题">标题</MDInput>
    <MDInput v-model="article.description" placeholder="请在此处输入文章描述">描述</MDInput>
    <MDInput v-model="article.banner" placeholder="请在此处输入banner图片地址">banner</MDInput>
    <div class='simplemde-container'>
      <textarea id='markdown-editor' ref="mde" v-model="article.content"></textarea>
    </div>
    <el-select v-model="article.status" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker
      v-model="article.postTime"
      align="right"
      type="datetime"
      placeholder="可选择日期(选填)">
    </el-date-picker>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import MDInput from 'components/material-input';
  import SimpleMDE from 'simplemde';
  import 'simplemde/dist/simplemde.min.css';
  import Article from 'services/article';

  export default {
    data() {
      return {
        article: {
          title: '',
          description: '',
          banner: '',
          content: '',
          status: 'publish',
          postTime: '',
          author: this.$store.state.user.username
        },
        options: [{
          value: 'publish',
          label: '发布状态'
        }, {
          value: 'draft',
          label: '草稿'
        }, {
          value: 'delete',
          label: '回收站'
        }]
      };
    },
    mounted() {
      this.mde = new SimpleMDE({
        element: this.$refs.mde,
        autofocus: false,
        spellChecker: false,
        placeholder: '在此编辑正文'
      });
      this.mde.codemirror.on('change', () => {
        this.article.content = this.mde.value();
      });
      if (this.$store.state.articleModifyId) {
        Article.getOne(this.$store.state.articleModifyId)
          .then(response => {
            for (const key in this.article) {
              if (this.article.hasOwnProperty(key) && response.data[key]) {
                this.article[key] = response.data[key];
              }
            }
            this.mde.value(response.data.content);
          })
          .catch(err => {
            this.$message.error(err.message);
            console.log(err);
          });
      }
    },
    methods: {
      handleSubmit() {
        if (this.article.postTime) {
          this.article.postTime = +this.article.postTime;
        }
        if (this.$store.state.articleModifyId) {
          Article.update(this.$store.state.articleModifyId, this.article)
            .then(response => {
              this.article.title = this.article.description = this.article.banner = this.article.content = this.article.postTime = '';
              this.mde.value('');
              this.$message({
                message: response.msg,
                type: 'success'
              });
            })
            .catch(err => {
              this.$message.error(err.message);
              console.log(err);
            });
        } else {
          Article.add(this.article)
            .then(response => {
              this.article.title = this.article.description = this.article.banner = this.article.content = this.article.postTime = '';
              this.mde.value('');
              this.$message({
                message: response.msg,
                type: 'success'
              });
            })
            .catch(err => {
              console.dir(err);
              this.$message.error(err.message);
            });
        }
      }
    },
    components: {
      MDInput
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .material-input__component {
    margin-bottom: 30px;
  }
</style>
