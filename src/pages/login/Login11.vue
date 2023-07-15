<template>
    <div class="wrapper">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-input v-model="code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8" style="margin-top: 8px;">
                <span @click="refreshCode"  style="cursor: pointer;margin-top: 10px">
                    <identify :identifyCode="identifyCode"></identify>
                </span>
            </el-col>
        </el-row>
    </div>
</template>
 
<script>
// import SIdentify from '@/components/identify.vue'
import identify from './identify.vue'
 
export default {
    name: "Login",
    components: { identify },
    data(){
        return{
            // 图片验证码
            code:'',
            identifyCode: '',
            // 验证码规则
            identifyCodes: '3456789ABCDEFGHGKMNPQRSTUVWXY',
        }
    },
    methods: {
        // 切换验证码
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        // 生成随机验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[Math.floor(Math.random() * (this.identifyCodes.length))]
            }
        },
    },
    mounted() {
        //进入页面则刷新验证码图片
        this.refreshCode();
    },
}
</script>