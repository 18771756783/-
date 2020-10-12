// 抽取公共的
// 不确定的作为参数
// 结果返回给用户

function my_template(id,data){
  // 获取字符串
  let str = document.querySelector('#'+id).innerHTML;
    // 定义正则
    let reg = /{{(\w+)}}/;
    // 循环替换，直到为null结束
    let result = reg.exec(str);
    while (result) {
      // 替换
      str = str.replace(result[0],data[result[1]]);
      // 重新检索字符串
      result = reg.exec(str);
    }
    return str;
}
