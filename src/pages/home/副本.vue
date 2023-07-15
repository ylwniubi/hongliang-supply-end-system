<template>
    <div ref="chartContainer" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
  export default {
    setup() {
      const chartContainer = ref(null);
  
      const renderChart = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartContainer.value);
  
        // 设置option选项，包括x轴、y轴和数据系列等信息
        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
  
      onMounted(() => renderChart()); 
  
      return { chartContainer };
     }
  }
  </script>
  
  <style scoped>
  /* 省略样式 */
  </style>