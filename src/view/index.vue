<template>
  <div id="container">
    <h2 id="title">挣闲钱管理系统</h2>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">用户审核</el-menu-item><identity></identity>
          <el-menu-item index="1-2">用户目录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">任务管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">任务审核</el-menu-item>
          <el-menu-item index="2-2">任务目录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">个人信息</el-menu-item>
          <el-menu-item index="3-2">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Identity from '../components/identity'
// export default {
//   name: 'index',
//   components: {
//     identity: Identity
//   },
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App'
//     }
//   },
//   methods: {
//     handleOpen (key, keyPath) {
//       console.log(key, keyPath)
//     },
//     handleClose (key, keyPath) {
//       console.log(key, keyPath)
//     }
//   }
// }
export default {
  components: {
    identity: Identity
  },
  data () {
    return {
      isCollapse: true
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

</style>
