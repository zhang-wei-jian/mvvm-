import Compile from './compile.js';

function replace(frag) {
  // 省略...
  // 替换的逻辑
  node.textContent = txt.replace(reg, val).trim();
  // 监听变化
  // 给Watcher再添加两个参数，用来取新的值(newVal)给回调函数传参
  new Watcher(vm, RegExp.$1, (newVal) => {
    node.textContent = txt.replace(reg, newVal).trim();
  });
}

// 重写Watcher构造函数
function Watcher(vm, exp, fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  // 添加一个事件
  // 这里我们先定义一个属性
  Dep.target = this;
  let arr = exp.split('.');
  let val = vm;
  arr.forEach((key) => {
    // 取值
    val = val[key]; // 获取到this.a.b，默认就会调用get方法
  });
  Dep.target = null;
}
