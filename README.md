

dep和watcher

先创建了dep实例，然后模板解析的时候创建watcher,接下来原型get调用，添加target引发又添加订阅，保留模板解析的旧值。等待修改数据执行set，走进set会调用dep的notify函数会便利watcher实例（sub）的update接下来run执行：拿一下watcher实例对象的旧值和重新调用原型get获取最新值（忽略他会再次addSub添加一个watcher实例订阅）watcher模板解析的旧值和最新get到的对不上就去执行模板中的订阅函数传入最新value去更新页面！！