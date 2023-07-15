import _ from 'lodash'; // 引入lodash
import { useCounterStore } from '@/stores/counter.js' 

let personalStore; // 定义一个全局变量
// 权限判断 （建议用这种）
export const hasAuth = (authorities) => {
  if (!personalStore) { // 只会初始化一次
    personalStore = useCounterStore(); // 生成store一个实例
  }
  const auth = personalStore?.personal?.role?.authority;
  return _.intersection(authorities, auth).length > 0; // 求交集，如果有交集，长度大约0
};
