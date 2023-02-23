export function Dep() {
  // dep消息订阅器，维护数组,用于收集订阅者
  this.id = uid++;
  this.subs = [];
}
// sb:{subs:[callback,callback]}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach((sub) => sub.update());
  },
  target: null,
};
let uid = 0;

// //////////////////////////////////////////////////////////////////////////////
export function Watcher(vm, key, cb) {
  this.cb = cb;
  this.vm = vm;
  this.key = key;
  // 此处为了触发属性的getter,从而添加自己，结合Observe更容易理解
  this.value = this.get(); //1new的时候这里开始,梦的开始
}
// watch：{fn:()=>{},value:''}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    let oldVal = this.value; //第一次模板解析调用拿到的
    let value = this.get(); //最新的

    if (value !== oldVal) {
      this.value = value;
      // console.log(this.cb);

      this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
      // this.cb(this.value);
    }
  },

  get: function () {
    Dep.prototype.target = this;

    let value = this.vm[this.key]; //触发get,添加订阅addSub
   
    

    Dep.prototype.target = null;
    return value; //第一次就是为了返回模板的值嘛
  },
};
