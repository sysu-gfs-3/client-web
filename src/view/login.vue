<template>
  <div id="login">
    <el-main>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <h3 id="title">登录</h3>
        <el-form-item
          label=""
          prop="account"
        >
          <el-input
            v-model="ruleForm.account"
            autocomplete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label=""
          prop="pass"
        >
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '不能为空'
          })
        } else {
          axios.post('/api/v1/login', {
            account: this.ruleForm.account,
            password: this.ruleForm.pass
          }).then((response) => {
            this.$refs[formName].validate((valid) => {
              if (response.data.status === 'ok') {
                var data = JSON.parse(response.data.data)
                this.$notify({
                  title: '登录成功',
                  message: '欢迎您  ' + data.name,
                  type: 'success'
                })
                this.$router.push({ path: '/首页/主页' })
                // console.log(data)
              } else {
                if (response.data.message === 'wrong password') {
                  this.$notify.error({
                    title: '错误',
                    message: '密码错误'
                  })
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '用户名错误'
                  })
                }
                console.log(response.data.message)
                return false
              }
            })
            console.log(response.data.status)
          }).catch(function (err) {
            console.log(err)
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    test () {
      axios.post('/api/v1/get_users', {
        user_type: 'all',
        page: 0
      }).then((response) => {
        var data = JSON.parse(response.data.data)
        console.log(data.length)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  width: 100%;
  height: 100%;
}
#login {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
#title {
  font-size: 20pt;
  margin-top: 120px;
}
.demo-ruleForm {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
