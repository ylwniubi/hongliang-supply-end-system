<template>
    <div>
        <el-form :model="form" label-width="120px">
            <el-form-item label="信息发布者名称:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item label="截至时间:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item label="货品类型:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item label="货品名称:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item label="货品重量:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item label="收购单价:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item label="联系电话:">
                <el-input v-model="form.name" class="inp" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">发布信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const form = reactive({
    name: '朱亮'
})
const onSubmit = (form) => {
  console.log(form)
}
</script>

<style scoped>
.inp {
    width: 500px;
}
</style>