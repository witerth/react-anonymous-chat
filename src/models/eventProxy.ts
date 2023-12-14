// eventProxy.js
'use strict';
const eventProxy = {
  onObj: {} as { [key: string]: ((arg0: unknown) => void)[] },
  on: function (key: string, fn: (arg0: unknown) => void) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }
    this.onObj[key].push(fn);
  },
  trigger: function (key: string, ...args: unknown[]) {
    if (!key) {
      return false;
    }
    // const args = [].concat(Array.prototype.slice.call(arguments, 1));
    if (this.onObj[key] !== undefined
      && this.onObj[key].length > 0) {
      for (const i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }
  }
};
export default eventProxy;