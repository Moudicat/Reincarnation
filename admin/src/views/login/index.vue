<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="card-box login-form">
      <h3 class="title">后台系统登录</h3>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {sha256} from 'services/security';

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!/^[a-z0-9]{5,}$/.test(value)) {
          callback(new Error('请输入正确的用户名'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) { // || !/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/.test(value)
          callback(new Error('密码格式错误'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            {required: true, trigger: 'blur', validator: validateUsername}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        loading: false
      };
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.loginForm.password = sha256(this.loginForm.password);
            this.$store.dispatch('login', this.loginForm)
              .then(() => {
                this.loading = false;
                this.$store.dispatch('getInfo')
                  .then(response => {
                    console.log(response);
                    this.$message({
                      message: '用户信息加载成功',
                      type: 'success'
                    });
                    this.$router.push({path: '/'});
                  })
                  .catch(err => {
                    this.$message.error(err.message);
                    this.loading = false;
                  });
              })
              .catch(err => {
                this.$message.error(err.message);
                this.loading = false;
              });
            this.loginForm.password = '';
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  .login-container {
    position: relative;
    height: 100vh;
    background-color: #2d3a4b;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }
</style>
