<template>
  <div id="container">
    <h2 id="title">挣闲钱管理系统</h2>
    <el-tabs
      tab-position="left"
      id="index"
    >
      <el-tab-pane label="身份审核">
        <identity />
      </el-tab-pane>
      <el-tab-pane label="任务审核">配置管理</el-tab-pane>
      <el-tab-pane label="用户管理">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Identity from '../components/identity'
export default {
  name: 'index',
  components: {
    identity: Identity
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
#container {
  height: 100%;
}
#title {
  height: 6%;
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  padding-left: 20px;
}
#index {
  height: 94%;
}
</style>
