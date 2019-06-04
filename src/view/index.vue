<template>
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
#index {
  height: 100%;
}
</style>
