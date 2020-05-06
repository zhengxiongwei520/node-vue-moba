export default {
  // 时间过滤器
  dateFormate(val, fmt) {
    let getDate = new Date(val);
    let o = {
      // year不写在这里是因为不用判断是否+0
      "M+": getDate.getMonth() + 1,
      "d+": getDate.getDate(),
      "h+": getDate.getHours(),
      "m+": getDate.getMinutes(),
      "s+": getDate.getSeconds(),
      "q+": Math.floor((getDate.getMonth() + 3) / 3), // 季度
      S: getDate.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      // 判断是否需要出现年份
      fmt = fmt.replace(
        RegExp.$1,
        (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
      // 有需要就把 fmt中的 yyyy替代成年份 有几个Y显示几个数字
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ?
          o[k] :
          ("00" + o[k]).substr(String(o[k]).length)
        );
      }
    }
    return fmt;
  }

}