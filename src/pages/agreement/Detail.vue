<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
const props = defineProps(['refreshList'])
const visible = ref(false); // 窗口是否显示
// 56个民族的列表
const nationList = ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族', '彝族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族', '黎族', '傣族', '畲族', '傈僳族', '东乡族', '仡佬族', '拉祜族', '水族', '佤族', '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族', '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族', '乌孜别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族', '仡什蒂族', '崩龙族'];
const form = reactive({
  name: '',  //姓名
  phone: '', //手机号码
  password: '', //密码
  head: '', //头像
  nations: '', //民族
  sex: '', //性别
  checkList: [], //爱好
  birth: '',  //生日
  roleId: '', // 角色id
})
const title = ref('新增人员信息');
const roleList = ref([]); // 角色列表
let isCreate = true; // 判断是否是新增
let value = null; // 用来保存record

// 拉取角色list
const getRoleList = async (page) => {
  const res = await axios.post('/api/list/role', { pageNo: 0, pageSize: 1000 }); // 使用keyword的值进行搜索
  const data = res.data;
  if (!data.success) {
    alert(data.message);
  }
  roleList.value = data.result.list; // 将获取到的list赋值给list.value
}
// getRoleList();

const show = () => {  // 新增的时候显示窗口
  visible.value = true;
  isCreate = true;
  title.value = '新增人员信息';
}
const edit = (record) => {
  value = record; // 保存record
  visible.value = true; // 显示出窗口
  form.name = record.name; // 去更改form的值
  form.phone = record.phone;
  form.password = record.password;
  form.head = record.head;
  form.nations = record.nations;
  form.sex = record.sex;
  form.checkList = record.checkList;
  form.birth = record.birth;
  form.roleId = record.roleId;
  title.value = '编辑人员信息';
  isCreate = false;
}
const beforeUpload = (data) => {
  if (!['image/jpg', 'image/jpeg', 'image/webp'].includes(data.type)) {
    return alert("格式不支持");
  }
  if (data.size / 1024 / 1024 > 2) {
    return alert(">2m");
  }
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
// 图片上传成功的处理
const onSuccess = (res) => {
  if (res.success) {
    form.head = res.result.url; // 设置头像为上传的url
  }
}
// 定义提交的函数
const submit = async () => {
  if (isCreate) {
    const res = await axios.post('/api/create/member', form);
    console.log('====================================');
    console.log(form);
    console.log('====================================');
    const data = res.data;
    if (data.success) {
      alert('新增成功！');
      visible.value = false; // 关闭本身窗口
      props.refreshList() //列表刷新
    } else {
      alert('创建失败！')
    }
  } else {
    const res = await axios.post('/api/modify/member', { id: value.id, ...form });
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
    <el-form ref="ruleFormRef" status-icon label-width="120px" :rules="rules" :model="form">
      <el-form-item label="头像">
        <el-upload class="head" action="/api/upload" :show-file-list="false" :on-success="onSuccess"
          :before-upload="beforeUpload">
          <img :src="form.head" class="avatar" />
          <el-icon class="icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birth" type="date" placeholder="选择生日" format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
      <el-form-item label="民族">
        <el-select v-model="form.nations" placeholder="请选择民族">
          <el-option v-for="item in nationList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="兴趣爱好">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="唱歌" />
          <el-checkbox label="跑步" />
          <el-checkbox label="打篮球" />
          <el-checkbox label="rap" />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="角色">
        <el-select v-model="form.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit()">提交</el-button>
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