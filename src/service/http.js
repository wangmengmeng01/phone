import Vue from 'vue'
import store from '@/store/'
import axios from 'axios'
import config from '@/config'
import native from '@/native'

const self = Vue.prototype;  // vue的实例

/**
 * 封装axios和fetch
 */
class http{
  constructor(obj){
    // 此参数为配置参数
    const options = {
      filter_msg: true, // 是否过滤msg
      filter_code: true,  // 是否过滤errcode
      loading: true // 是否显示loading框
    };

    obj.options = {...options,...obj.options}; // 取值
    let {method, api, params, ...option} = {...obj}; // 取值

    let {loading, filter_code, filter_msg} = option.options;// 取值
    loading && native.loading('show'); // 根据loading属性显示loading框
    this.method = method;  // 请求方式
    this.params = params;  // 请求参数
    this.filter_code = filter_code;
    this.filter_msg = filter_msg;
    this.loading = loading;
    this.url = `${config.url}${api}`; // 请求地址
    return this.$axios()
  }

  /**
   * 封装axios
   * @returns {Promise}
   */
  $axios(){
    return new Promise((resole,reject)=> {
      let _params = {
        method: this.method,
        url: this.url,
        transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.slice(0,ret.length-1)
        }],
        validateStatus: (status)=> {
          this.loading && native.loading('hide');  // 隐藏loading
          return status >= 200 && status < 300; // 默认的
        },
      }
      this.params = Object.assign({},this.params,{'client': '2'},{'userToken': store.state.user.userToken || ''});
      this.method === 'post'
        ?
        Object.assign(_params, {
          data: this.params,
        })
        :
        Object.assign(_params,{
          params: this.params,
        });
      // console.log(_params)

      axios(_params).then(r => {
        this.$resole(resole,reject,r.data)
      }).catch(() => {
        this.$reject(reject,'系统错误')
      })
    })
  }

  /**
   * 成功的逻辑
   * @param resole
   * @param reject
   * @param r
   */
  $resole(resole,reject,r){
  	if (!this.filter_code){
  		resole(r);
  		return
  	}
    if (r.code === '100') { // 0才会resole
      resole(r.result)
    } else {  // 其他reject
      if(r.code === '1000'){
        self.$go('/login')
      }
      this.$reject(reject,r.message)
    }
  }

  /**
   * 失败的逻辑
   * @param err
   * @param isfetch
   */
  $reject(reject,message){
    if(!message) return;
    this.filter_msg && self.$toask(message);
    reject(message)
  }
}


export default obj=>new http(obj);

