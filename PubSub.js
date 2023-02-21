const PubSub = {
  subscribeObj: {},
  subscribe(name, callblack) {
    this.subscribeObj[name] = callblack;
  },
  publish(name) {
    this.subscribeObj[name]();
  },
};
export default PubSub;
// ////////////////////////////////////////////////

// (function (root) {
//   let subscribeObj = {};

//   const PubSub = {
//     subscribe(name, callblack) {
//       if (Array.isArray(subscribeObj[name]) === false) {
//         subscribeObj[name] = [];
//       }
//       subscribeObj[name].push(callblack);
//     },
//     publish(name) {
//       subscribeObj[name].forEach((item) => {
//         item();
//       });
//     },
//   };
//   // export default PubSub;
//   root.PubSub = PubSub;
// })(this);
