<script setup>
import { ref, reactive, } from 'vue';
import axios from 'axios';
import { ROLE_MAP } from '@/lib/types.js'; // 用export暴露出来的一定要用{}
const props = defineProps(['refreshList'])
const visible = ref(false); // 窗口是否显示
let form = reactive({
  name: '',  //管理员
  description: '管理员拥有所有的角色', //管理员描述
  head: '', //头像
  authority: [0, 1, 2, 3, 4, 5], // 权限
})
const title = ref('新增人员信息');
const title1 = ref('确认添加')
let isCreate = true; // 判断是否是新增
let value = null; // 用来保存record

const show = () => {  // 新增的时候显示窗口
  visible.value = true;
  form.name = '';
  // form.description = '';
  form.head = '';
  form.authority = [];
  isCreate = true;
  title.value = '新增管理员信息';
  title1.value = ref('确认添加')
}
const edit = (record) => {  //修改管理员信息
  value = record; // 保存record
  isCreate = false;
  visible.value = true; // 显示出窗口
  form.name = record.name; // 去更改form的值
  form.description = record.description
  form.head = record.head;
  form.authority = record.authority;
  title1.value = ref('确认修改')
}
const beforeUpload = (data) => {
  if (!['image/jpg', 'image/jpeg', 'image/webp'].includes(data.type)) {
    return alert("格式不支持");
  }
  if (data.size / 1024 / 1024 > 2) {
    return alert(">2m");
  }
}
// 图片上传成功的处理
const onSuccess = (res) => {
  if (res.success) {
    form.head = res.result.url; // 设置头像为上传的url
  }
}

// 定义提交的函数
const submit = async () => {
  // form.authority = form.authority.map((item) => Number(item)).sort((a, b) => a - b);
  // console.log(form)
  if (isCreate) {
    // let formcopy = JSON.parse(JSON.stringify(form))
    const res = await axios.post('/api/create/role', form);
    const data = res.data;
    if (data.success) {
      alert('新增成功！');
      // form = formcopy
      visible.value = false; // 关闭本身窗口
      props.refreshList() //列表刷新
    } else {
      alert('创建失败！')
    }
  } else {
    const res = await axios.post('/api/modify/role', { id: value.id, ...form });
    const data = res.data;
    if (!data.success) {
      return alert(data.message);
    }
    visible.value = false; // 关闭本身窗口
    // 通知列表刷新
    props.refreshList();
  };
}
defineExpose({ show, edit }); // 一定要用对象， 把方法和属性暴漏出去，其他组件可以调用
</script>

<template>
  <el-dialog v-model="visible" :title="title">
    <el-form ref="ruleFormRef" status-icon label-width="120px" :model="form">
      <el-form-item label="设置头像">
        <el-upload class="head" action="/api/upload" :show-file-list="false" :on-success="onSuccess"
          :before-upload="beforeUpload">
          <img :src="form.head" class="avatar" />
          <el-icon class="icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="管理员姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="管理员描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="管理员权限选择">
        <el-checkbox-group v-model="form.authority">
          <el-checkbox v-for="(item, index) in ROLE_MAP" :key="index" :label="+index">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit()">{{ title1 }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.head {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  height: 80px;
  width: 80px;
}

.icon {
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  width: 100%;
  height: 100%;
}
</style>