<template>
  <div class="tac">
    <header>
      <div class="title">红梁供应端系统</div>
      <div class="hy">
        欢迎您 &ensp;
        <span>
          <img src="../assets/男头1.png" :alt="store.personal?.head" class="tp">
          <!-- <img :src="store.personal?.head" :alt="store.personal?.head" class="tp"> -->
        </span>
        <span class="info">{{ store.personal?.name }}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-icon class="icon1">
              <User></User>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="s">密码设置</el-dropdown-item>
              <el-dropdown-item command="p">信息设置</el-dropdown-item>
              <el-dropdown-item command="q">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-drawer v-model="drawer2">
        <template #header>
          <h4 v-if="swit">修改密码</h4>
          <h4 v-else>信息设置</h4>
        </template>
        <template #default>
          <div v-if="swit">
            <div>手机号:<el-input class="inpsty" v-model="form.phone" placeholder="请输入手机号" /></div>
            <div>原密码:<el-input class="inpsty" v-model="form.password" placeholder="请输入旧密码" /></div>
            <div>新密码:<el-input class="inpsty" v-model="password2" placeholder="请设置新密码" /></div>
            <div>确认新密码:<el-input class="inpsty" v-model="password3" placeholder="请确认新密码" @keydown="handleKeyup" /></div>
            <span class="err">新密码要和旧密码一致</span>
          </div>
          <div v-else>
            <el-form ref="ruleFormRef" class="forms" status-icon label-width="80px" :rules="rules" :model="form2">
              <el-form-item label="用户名">
                <el-input v-model="form2.name" />
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model.number="form2.phone" />
              </el-form-item>
              <el-form-item label="头像">
                <el-upload class="head" action="/api/upload" :show-file-list="false" :on-success="onSuccess"
                  :before-upload="beforeUpload">
                  <img :src="form2.head" class="avatar" />
                  <el-icon class="icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <el-button v-if="swit" type="primary" @click="confirmClick">确定</el-button>
            <el-button v-else type="primary" @click="confirmClick2">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </header>
    <div class="main">
      <el-menu default-active="/home" :router="true" :collapse="isCollapse" class="el-menu-vertical-demo nav">
        <el-menu-item index="/home">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/agreement">
          <!-- <el-menu-item v-if="hasAuth([CO.SHOW_MEMBER_AUTH, CO.MANAGE_MEMBER_AUTH])" index="/member"> -->
          <el-icon>
            <Avatar />
          </el-icon>
          <span>协议管理</span>
        </el-menu-item>
        <el-menu-item index="/enterprise">
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>企业认证</span>
        </el-menu-item>
        <el-menu-item index="/landmark">
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>地标认证</span>
        </el-menu-item>
        <el-menu-item index="/fund">
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>资金到账情况</span>
        </el-menu-item>

        <el-sub-menu index="/order">
          <template #title>
            <el-icon>
              <ShoppingCart />
            </el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/orders"><span>收购订单</span></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/gongxu">
          <template #title>
            <el-icon>
              <Shop />
            </el-icon>
            <span>供需频道</span>
          </template>
          <el-menu-item index="/gongying"><span>需求信息</span></el-menu-item>
          <el-menu-item index="/xuqiu"><span>需求发布</span></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/account">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/huiyuan"><span>会员注册</span></el-menu-item>
          <el-menu-item index="/logon"><span>会员登录</span></el-menu-item>
          <el-menu-item index="/forget"><span>忘记密码</span></el-menu-item>
          <el-menu-item index="/information"><span>账号信息</span></el-menu-item>
          <el-menu-item index="/nonghu"><span>农户信息</span></el-menu-item>
          <el-menu-item index="/mine"><span>我的账号</span></el-menu-item>
        </el-sub-menu>

      </el-menu>
      <div class="right">
        <div class="nav1">
          <!-- 折叠面板 -->
          <el-icon @click="isCollapse = !isCollapse" :size="26">
            <component :is="cname"></component>
          </el-icon>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in matchedRoutes" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, reactive, watch, handleError } from 'vue'
import _ from 'lodash'; // 引入lodash
import { useRouter , useRoute } from 'vue-router';
import post from '@/lib/post.js'
import { useCounterStore } from '@/stores/counter.js'
import { ElMessage } from 'element-plus'   //优化弹框

const store = useCounterStore()  //生成store一个实例
const router = useRouter()
const route = useRoute()
const isCollapse = ref(false) //折叠面板
const drawer2 = ref(false)  //抽屉开关
const swit = ref('1')  //设置选择
const matchedRoutes = ref([])  //匹配的路由对象
const form = reactive({  //修改密码(原账号)
  phone: store.personal.phone,
  password: ''
})
const form2 = reactive({  //修改个人信息
  name: '', //用户名
  phone: '', //手机号码
  head: '', //头像
})
const password2 = ref('')  //新密码
const password3 = ref('')
const cname = computed(() => {
  return isCollapse.value ? "Expand" : "Fold"
})
watch(password3, (pre) => {
  password3.value = pre;
  console.log(password3.value)
})
// 面包屑导航
const getBreadCom = () => {
  matchedRoutes.value = route.matched.filter(item => item.meta.title)
}
getBreadCom()
watch ( () => route.path, () => getBreadCom())
const handleKeyup = () => {
  const repass = document.querySelector('.err')
  if (password3.value != password2.value) {
    repass.style.display = 'none'
  } else {
    repass.style.display = 'block'
  }
}
const handleCommand = (res) => {
  if (res == 'q') {  //退出当前登录
    localStorage.removeItem('UserId')
    router.push('/login')
  }
  if (res == 's') {  //打开修改密码面板
    drawer2.value = true
    swit.value = 1
  }
  if (res == 'p') {  //打开修改用户信息面板
    drawer2.value = true
    swit.value = 0
    form2.name = store.personal.name
    form2.phone = store.personal.phone
    form2.head = store.personal.head
  }
}
// 图片上传成功的处理
const onSuccess = (res) => {
  if (res.success) {
    form2.head = res.result.url; // 设置头像为上传的url
  }
}
const beforeUpload = (data) => {
  if (!['image/jpg', 'image/jpeg', 'image/webp'].includes(data.type)) {
    return alert("格式不支持");
  }
  if (data.size / 1024 / 1024 > 2) {
    return alert(">2m");
  }
}
const cancelClick = () => {
  drawer2.value = false
}
const confirmClick = async () => {   //修改密码
  if (form.phone != store.personal.phone) {
    return ElMessage.error('原账户手机号输入有误!')
  }
  if (form.password != store.personal.password) {
    return ElMessage.error('原账户密码输入有误!')
  }
  if (password3.value != password2.value) {
    return ElMessage.error('两次密码输入不一样!')
  }
  const res = await post('/api/modify/member', { search: { ...form }, password: password2.value })
  if (res) {
    ElMessage({
      message: '修改成功!',
      type: 'success',
    })
  }
  drawer2.value = false
}
const confirmClick2 = async () => {   //修改用户信息
  const res = await post('/api/modify/member', { ...form2, id: localStorage.getItem('userId') })
  if (res) {
    ElMessage({
      message: '修改成功!',
      type: 'success',
    })
  }
  store.send(res)
  drawer2.value = false
}
// 手机号校验规则
const phones = (rule, value, callback) => {
  const rules = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === '') {
    callback(new Error('输入不能为空'))
  } else if (!rules.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
const rules = reactive({
  phone: [{ validator: phones, trigger: 'blur' }],
})

</script>

<style scoped>
.err {
  color: red;
  font-size: 12px;
  position: absolute;
  top: 460px;
  left: 25px;
  display: none;
}

.tac {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  height: 10%;
  width: 100%;
  background-color: #7F8FA6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 60px;
  /* background: url('@/assets/bj1.jpeg'); */
  background-color: #7F8FA6;
}

.hy {
  margin-right: 100px;
  font-size: 24px;
  color: #ccc;
}

.title {
  font-size: 38px;
  font-family: '隶书';
  color: #fff;
}

.icon1 {
  vertical-align: middle;
  font-size: 24px;
  margin-top: 5px;
  margin-left: 10px;
  color: #ccc;
}

section {
  flex: 1;
  width: 100%;
  display: flex;
  overflow: auto;
}

.right {
  flex: 1;
  display: flex;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.nav {
  /* background: -webkit-linear-gradient(-120deg, red, blue); */
  background-color: #dedede;
  color: #fff;
  overflow-x: auto;
  overflow-y: scroll;
}
.nav::-webkit-scrollbar {
    display: none;
}

.main {
  flex: 1;
  display: flex;
  height: 90%;
  /* overflow: auto; */
  /* overflow-y: scroll; */
}

.inpsty {
  margin: 8px 0;
}

.info {
  color: gold;
}

.head {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  height: 120px;
  width: 120px;
}

.head:hover {
  border: 3px dashed skyblue;
}

.icon {
  font-size: 20px;
  position: absolute;
  font-size: 28px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.forms {
  border: 3px solid #ccc;
  border-radius: 25%;
  padding: 70px 20px 0 10px;
  height: 300px;
}

h4 {
  font-size: 32px;
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.avatar {
  width: 120px;
  height: 120px;
}

.tp {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  vertical-align: middle;
  border-radius: 50%;
}
.nav1{
  display: flex;
  align-items: center;
}
</style>
