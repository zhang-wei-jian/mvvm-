// Dep也是一种订阅发布模式，不过不是依靠传入的属性名，是靠new实例
export function Dep() {
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
};

export function Watcher(fn) {
  this.fn = fn;
}
Watcher.prototype.update = function () {
  this.fn();
};
