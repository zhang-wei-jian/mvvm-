// 创建Compile构造函数
export default function Compile(el, vm) {
  // 将el挂载到实例上方便调用

  vm.$el = document.querySelector(el);
  // 在el范围里将内容都拿到，当然不能一个一个的拿
  // 可以选择移到内存中去然后放入文档碎片中，节省开销
  let fragment = document.createDocumentFragment();

  let child;
  while ((child = vm.$el.firstChild)) {
    fragment.appendChild(child); // 此时将el中的内容放入内存中
  }
  // 对el里面的内容进行替换
  function replace(frag) {
    Array.from(frag.childNodes).forEach((node) => {
      let txt = node.textContent;
      let reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}

      if (node.nodeType === 3 && reg.test(txt)) {
        // 即是文本节点又有大括号的情况{{}}
        console.log(RegExp.$1); // 匹配到的第一个分组 如： a.b, c
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach((key) => {
          val = val[key]; // 如this.a.b
        });
        // 用trim方法去除一下首尾空格
        node.textContent = txt.replace(reg, val).trim();
      }
      // 如果还有子节点，继续递归replace
      if (node.childNodes && node.childNodes.length) {
        replace(node);
      }
    });
  }

  replace(fragment); // 替换内容

  vm.$el.appendChild(fragment); // 再将文档碎片放入el中
}
