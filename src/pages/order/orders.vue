<template>
  <div>
    <div>
      <div v-if="showIndexPage">

        <el-form :inline="true" :model="formInline" size="medium">
          <el-form-item label="订单名称：">
            <el-input v-model="formInline.name" placeholder="订单名称"></el-input>
          </el-form-item>
          <el-form-item label="订单号：" >
            <el-input v-model="formInline.address" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item  label="供应方名称：" >
            <el-input   v-model="formInline.phone" placeholder="请输入供应方名称"></el-input>
          </el-form-item>
          <el-form-item  label="需求方名称：" >
            <el-input   v-model="formInline.phone" placeholder="请输入需求方名称"></el-input>
          </el-form-item>
          <el-form-item  label="货品名称：" >
            <el-input   v-model="formInline.phone" placeholder="请输入货品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="sortChange">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="oc">
          <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select><br><br>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
        >
          <el-table-column
              prop="date"
              label="订单名称"
              width="120"
          />
          <el-table-column
              prop="name"
              label="订单提供方"
              width="120"
          />
          <el-table-column
              prop="address"
              label="订单需求方"
              width="120"
          />
          <el-table-column
              prop="address"
              label="货品名称"
              width="120"
          />
          <el-table-column
              prop="address"
              label="订单状态"
              width="120"
          />
          <el-table-column
              prop="date"
              label="重量"
              width="120"
          />
          <el-table-column
              prop="date"
              label="通过质检重量"
              width="120"
          />
          <el-table-column
              prop="date"
              label="单价"
              width="120"
          />
          <el-table-column
              prop="date"
              label="所属仓库"
              width="120"
          />
          <el-table-column
              prop="date"
              label="协议"
              width="120"
          />
          <el-table-column
              prop="date"
              label="订单类型"
              width="120"
          />
          <el-table-column
              prop="date"
              label="订单等级规格"
              width="120"
          />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="success" size="mini" @click="updateOwner(scope.row.id)">解冻</el-button>
              <el-button type="danger" size="mini" @click="deleteowner(scope.row.id)">冻结</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="op">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "orders",
  data() {
    return {

      value:'',
      options: [{
        value: '选项1',
        label: '解冻'
      }, {
        value: '选项2',
        label: '冻结'
      }, ],

      showDialog: false,
      formInline:{},
      showIndexPage:true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]


    }
  },
}
</script>

<style scoped >
.op{
  margin: auto;
  /*background-color: red;*/
  height: 100px;
  display: flex;
  justify-content: center;

}
.oc{
  margin-left: 20px;
}
</style>
