/**
 * 全局注册指令
 */

export default {
  install(app: any) {
    const directives = import.meta.globEager("./modules/*.ts");

    for (const [key, value] of Object.entries(directives)) {
      // 拼接组件注册的name
      const arr = key.split("/");
      const directiveName = arr[arr.length - 1].replace(".ts", "");
      // 完成注册
      app.directive(directiveName, value.default);
    }
  },
};
