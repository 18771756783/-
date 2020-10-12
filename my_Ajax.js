/* 
  封装的过程
    重复的代码写出来
    不能固定的，作为参数传递
*/
/**
 * ajax工具函数-GET
 * @param {*} url 
 * @param {*} data (key1=value1&key2=value2)
 * @param {*} success 
 */
// GET请求
/* 
  参数说明：
    url: 服务器地址
    data: 传递的数据，格式 key1=value1&key2=value2
    success: 回调函数，处理用户代码
*/
function get(url, data, success) {
  // 创建异步对象
  let xhr = new XMLHttpRequest();
  // 请求行
  // data为空时
  if (data) {
    url = url + '?' + data;
  }
  xhr.open('get', url);
  // 请求头

  // 回调函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // 调用传入的回调函数
      success(xhr.responseText);
      // // 普通字符串
      // console.log(xhr.responseText);
      // // JSON
      // console.log(JSON.parse(xhr.responseText));
      // // XML
      // console.log(xhr.responseXML);
    }
  }
  // 发送请求主体
  xhr.send(null);
}

/**
 * ajax工具函数-POST
 * @param {*} url 
 * @param {*} data (key1=value1&key2=value2)
 * @param {*} success 
 */
// POST请求
function post(url, data, success) {
  // 创建异步对象
  let xhr = new XMLHttpRequest();
  // 请求行
  xhr.open('post', url);
  // 请求头
  // 有数据才需要设置
  if (data) {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  // 回调函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      success(xhr.responseText);
    }
  }
  // 发送请求主体
  xhr.send(data);
}

/**
 * ajax工具函数-自选
 * @param {*} url 
 * @param {*} type 传递类型get或者post
 * @param {*} data (key1=value1&key2=value2)
 * @param {*} success 
 */
// 自己选择GET或者POST
function ajax_test(url, type, data, success) {
  let xhr = new XMLHttpRequest();
  // 如果是get并且有数据
  if (type == 'get' && data) {
    url = url + '?' + data;
    // 这样的话最后只用send(data)即可
    data = null;
  }
  xhr.open(type, url);
  // 请求头只有在post请求并且有数据的情况下才需要设置
  if (type == 'post' && data) {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      success(xhr.responseText);
    }
  }
  xhr.send(data);
}

// 只传递一个参数，传入的是对象
/* 
  键名：
    url
    type
    data
    success
*/
// 不需要记忆参数的顺序，只需要记忆参数的键名即可
function ajax(option){
  let xhr = new XMLHttpRequest();
  // 如果是get并且有数据
  if (option.type == 'get' && option.data) {
    option.url = option.url + '?' + option.data;
    // 这样的话最后只用send(data)即可
    option.data = null;
  }
  xhr.open(option.type, option.url);
  // 请求头只有在post请求并且有数据的情况下才需要设置
  if (option.type == 'post' && option.data) {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // option.success(xhr.responseText);
      // console.log(xhr.getResponseHeader('Content-type'));
      // 拿到服务器返回的类型
      let type = xhr.getResponseHeader('Content-Type');
      // 是否为json
      if(type.indexOf('json') != -1){
        option.success(JSON.parse(xhr.responseText));
      }
      // 是否为xml
      else if(type.indexOf('xml') != -1){
        option.success(xhr.responseXML);
      }
      // 普通字符串
      else{
        option.success(xhr.responseText);
      }
    }
  }
  xhr.send(option.data);
}
