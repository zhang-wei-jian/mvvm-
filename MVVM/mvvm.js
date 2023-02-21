import { Dep, Watcher } from './dep.js';
import Compile from './compile.js';

function Observe(data) {
  // 数据劫持是重写了data中的属性，变成闭包存在
  Object.keys(data).forEach((key) => {
    const dep = new Dep()
    let value = data[key];
    observe(value);
    Object.defineProperty(data, key, {
      get() {
        return value;
      },
      set(newVal) {
        if (value === newVal) return;
        value = newVal;
        dep.notify()//调用发布来触发所有的订阅
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
  observe(data); //1：数据接触
  // 数据代理并不需要闭包，只是在实例身上添加了data属性,为了方便this.key
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
