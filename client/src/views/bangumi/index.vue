<template>
  <Layout>
    <div slot="content" class="bangumi">
      <el-table
        :data="bangumiListData"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        @expand="handleDetailOpen">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand" v-if="props.row.detail">
              <el-form-item label="原番名">
                <span>{{ props.row.detail.title }}</span>
              </el-form-item>
              <el-form-item label="中文番名">
                <span>{{ props.row.detail.titleTranslate['zh-Hans'].toString()}}</span>
              </el-form-item>
              <el-form-item label="番组开始时间">
                <Tag>{{ props.row.detail.begin  | formatDate1}}</Tag>
              </el-form-item>
              <el-form-item label="番组完结时间">
                <Tag>{{ props.row.detail.end ? props.row.detail.end : '未确定' | formatDate1}}</Tag>
              </el-form-item>
              <el-form-item label="官方网站">
                <span>{{ props.row.detail.officialSite }}</span>
              </el-form-item>
              <el-form-item label="">
                <span></span>
              </el-form-item>
              <el-form-item :label="`${sites[site.site].title}`" v-for="site in props.row.detail.sites">
                <Tag type="red"><a :href="siteMap(site)" target="_blank" rel="nofollow external">点我打开浏览</a></Tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
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
          label="最后日期"
          sortable
          width="140">
          <template scope="scope">
            <span>{{scope.row.date | formatDate(scope.row.date)}}</span>
          </template>
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
  import Animation from 'services/animation';
  import Bangumi from 'services/bangumi';
  import {formatDate} from 'services/utils';
  import Tag from 'components/tag';

  export default {
    data() {
      return {
        bangumiListData: [],
        sites: {
          'bangumi': {
            'title': '番组计划',
            'urlTemplate': 'http://bangumi.tv/subject/{{id}}',
            'type': 'info'
          },
          'saraba1st': {
            'title': 'Stage1st',
            'urlTemplate': 'http://bbs.saraba1st.com/2b/thread-{{id}}-1-1.html',
            'type': 'info'
          },
          'acfun': {
            'title': 'AcFun',
            'urlTemplate': 'http://www.acfun.cn/v/ab{{id}}',
            'type': 'onair'
          },
          'bilibili': {
            'title': '哔哩哔哩',
            'urlTemplate': 'https://bangumi.bilibili.com/anime/{{id}}',
            'type': 'onair'
          },
          'tucao': {
            'title': 'TUCAO',
            'urlTemplate': 'http://www.tucao.tv/index.php?m=search&c=index&a=init2&q={{id}}',
            'type': 'onair'
          },
          'sohu': {
            'title': '搜狐视频',
            'urlTemplate': 'http://tv.sohu.com/{{id}}',
            'type': 'onair'
          },
          'youku': {
            'title': '优酷',
            'urlTemplate': 'https://list.youku.com/show/id_z{{id}}.html',
            'type': 'onair'
          },
          'tudou': {
            'title': '土豆',
            'urlTemplate': 'http://www.tudou.com/albumcover/{{id}}.html',
            'type': 'onair'
          },
          'qq': {
            'title': '腾讯视频',
            'urlTemplate': 'https://v.qq.com/detail/{{id}}.html',
            'type': 'onair'
          },
          'iqiyi': {
            'title': '爱奇艺',
            'urlTemplate': 'http://www.iqiyi.com/{{id}}.html',
            'type': 'onair'
          },
          'letv': {
            'title': '乐视',
            'urlTemplate': 'http://www.le.com/comic/{{id}}.html',
            'type': 'onair'
          },
          'pptv': {
            'title': 'PPTV',
            'urlTemplate': 'http://v.pptv.com/page/{{id}}.html',
            'type': 'onair'
          },
          'kankan': {
            'title': '响巢看看',
            'urlTemplate': 'http://movie.kankan.com/movie/{{id}}',
            'type': 'onair'
          },
          'mgtv': {
            'title': '芒果tv',
            'urlTemplate': 'http://www.mgtv.com/h/{{id}}.html',
            'type': 'onair'
          },
          'dmhy': {
            'title': '动漫花园',
            'urlTemplate': 'https://share.dmhy.org/topics/list?keyword={{keyword}}',
            'type': 'resource'
          },
          'nyaa': {
            'title': 'nyaa',
            'urlTemplate': 'https://www.nyaa.se/?page=search&term={{keyword}}',
            'type': 'resource'
          }
        }
      };
    },
    methods: {
      handleDetailOpen(row) {
        if (row.detail) return;
        if (row.id) {
          Bangumi.get(row.id)
            .then(response => {
              this.bangumiListData.forEach(e => {
                if (e.id === row.id) {
                  this.$set(e, 'detail', response.data);
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      siteMap(site) {
        let tp = this.sites[site.site].urlTemplate;
        const regexp = /{{(.+)}}/;
        tp = tp.replace(regexp, ($0, $1) => {
          return site[$1];
        });
        return tp;
      }
    },
    beforeMount() {
      Animation.get()
        .then(response => {
          if (response.data && response.data.length) {
            this.bangumiListData = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    filters: {
      formatDate(date) {
        return formatDate(new Date(Number(date)), 'yyyy-MM-dd');
      },
      formatDate1(date) {
        if (date === '') return '';
        if (date === '未确定') return '未确定';
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      Layout,
      Tag
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
