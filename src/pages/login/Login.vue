<template>
    <div class="login">
        <div class="box">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="60px">
                <el-form-item label="账号" prop="phone">
                    <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                <span @click="refreshCode" style="cursor: pointer;margin-top: 10px;margin-left: 118px;">
                    <identify :identifyCode="identifyCode"></identify>
                </span>
            </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { useCounterStore } from '@/stores/counter.js'  //引入仓库
import { ElMessage } from 'element-plus'   //优化弹框
import identify from './identify.vue'
const store = useCounterStore()  //使用仓库
const ruleFormRef = ref()
const router = useRouter()
const identifyCode = ref('') //图片验证码
const identifyCodes = ref('3456789ABCDEFGHGKMNPQRSTUVWXY')  // 验证码规则
const refreshCode = () => {  // 切换验证码
    identifyCode.value = ''
    makeCode(identifyCodes.value, 4)
}
const makeCode = (o, l) => { // 生成随机验证码
    for (let i = 0; i < l; i++) {
        identifyCode.value += identifyCodes.value[Math.floor(Math.random() * (identifyCodes.value.length))]
    }
    sessionStorage.setItem('code',identifyCode.value)
}
refreshCode()  //进入页面则刷新验证码图片
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}
const ruleForm = reactive({
    phone: '17685121804',
    password: '123',
    code:''
})
const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})
// const submitForm = async (formEl) => {   //账号登录
//     if(!ruleForm.phone || !ruleForm.password) {
//         return ElMessage.error('账户或者密码不能为空!')
//     }
//     const code = sessionStorage.getItem('code')
//     if(ruleForm.code != code) {
//         return ElMessage.error('验证码错误!')
//     }
//     const res = await axios.post('/api/login', formEl)
//     const data = res.data
//     localStorage.setItem('userId', data.result.userId)
//     // console.log(data.result)
//     if (!data.success) {
//         return alert(data.message)
//     } else {
//         ElMessage({
//             message: '登录成功!',
//             type: 'success',
//         })
//         router.push('/home')
//     }
// }
const submitForm = () => {
    router.push('/home')
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style scoped>
.login {
    width: 100%;
    position: relative;
    /* background-color: skyblue; */
    background: url('../../assets/bj.jpeg');
}

.box {
    width: 450px;
    height: 500px;
    background-color: skyblue;
    opacity: .8;
    border-radius: 25%;
    border: 10px solid #ccc;
    position: absolute;
    margin-left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-form {
    width: 300px;
}
</style>