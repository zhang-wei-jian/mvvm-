import { Dep, Watcher } from './dep.js';
import Compile from './compile.js';

function Observe(data) {
  const dep = new Dep();
  // 数据劫持是重写了data中的属性，变成闭包存在:递归有1深层递归2更新数据递归
  Object.keys(data).forEach((key) => {
    let value = data[key];
    observe(value);
    Object.defineProperty(data, key, {
      get() {
        // console.log(dep.target, 'target');
        //在数据劫持中只用到了dep,target是在new Watch的时候用到了才能执行下面，给dep添加
        dep.target && dep.addSub(dep.target); //只为了记录一个watcher实例化对象
        // console.log(dep);

        return value;
      },
      set(newVal) {
        if (value === newVal) return;
        // console.log(value, newVal, '新的和旧的要修改的set');
        value = newVal;

        dep.notify(); //让所有的watch订阅执行
        observe(value);
      },
    });
  });
}
function observe(data) {
  // 有没有必要递归劫持
  if (!data || typeof data != 'object') return;
  Observe(data);
}

export default function mvvm(options = {}) {
  let data = options.data;
  observe(data); //数据劫持
  // 数据代理给this身上添加了data中重名的属性
  Object.keys(data).forEach((key) => {
    Object.defineProperty(this, key, {
      get() {
        return options.data[key];
      },
      set(newVal) {
        options.data[key] = newVal;
      },
    });
  });
  Compile(options.el, this); //3:数据编译，模板解析
}
