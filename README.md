

### dep和watcher

每一个数据劫持都会new Dep出实例对象。

然后模板解析的时候创建watcher,接下来原型get调用，添加target引发又添加订阅，保留模板解析的旧值。等待修改数据执行set

数据修改set函数调用，修改数据并且会调用dep.notify函数会遍历watcher实例（sub）的update接下来run执行：拿一下watcher实例对象的旧值和重新调用原型get获取最新值（忽略他会再次addSub添加一个watcher实例订阅）watcher模板解析的旧值和最新get到的对不上就去执行模板中的订阅函数传入最新value去更新页面！！