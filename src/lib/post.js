import axios from 'axios'; // 引入axios
import { ElMessageBox } from 'element-plus'
import { ElLoading } from 'element-plus'

// url 为我们的接口
// params 为参数
// wait 是否等待，默认不等待
function post(url, params = {}, wait) { // 定义我们的post接口
  if (process.env.NODE_ENV === 'production') { // 如果是生产模式，才去掉/api
    url = url.replace('/api', '');
  }
  return new Promise(resolve => { // 使用Promise封装异步
    console.log(`${url}发送：`, params);
    // 加载等待界面
    const toast = wait && ElLoading.service({
      lock: true,
      text: '数据获取中,请稍后...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    params.userId = localStorage.userId; // 每一个接口要跟一个userId
    axios.post(url, params).then(res => {
      const data = res.data; // 接受返回值
      if (!data.success) { // 如果登录失败，显示失败的信息
        resolve(); // 返回不成功，返回空值回去
        wait && toast.close(); // 关闭等待窗口
        // return showDialog({ message: data.message }); // 使用好看的显示
        return ElMessageBox.alert(data.message); // 使用好看的显示
      }
      console.log(`${url}接收：`, data.result);
      wait && toast.close(); // 关闭等待窗口
      resolve(data.result); // 网络成功的处理
    }).catch(e => { // 异常处理
      console.log(`${url}错误：`, e);
      resolve();  // 服务器错误，返回空值回去
      wait && toast.close(); // 关闭等待窗口
      // showDialog({ message: '服务器错误' });
      ElMessageBox.alert('服务器错误')
    });
  });
}
// 暴漏出去
export default post;