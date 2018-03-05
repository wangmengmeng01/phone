export const _default = {
  url: `${location.origin}/apigw/client/`,
  origin: `${location.origin}/`,
};

export const dev = {
  url: 'http://192.168.7.110:5555/zw/api/',
  // url: 'http://192.168.10.52:5555/zw/api/',
  origin: 'http://h5.dev.fxds/',
};

export const test = {
  url: 'https://192.168.7.110:8506/zw/api/',
  origin: 'http://h5.test.fxds/',
};

export const uat = {
  url: 'https://192.168.7.110:8506/zw/api/',
  origin: 'http://h5.uat.fxds/',
};

export const pro = {
  url: 'https://192.168.7.110:8506/zw/api/',
  origin: 'https://h5.faxindai.com/',
};


export const moxiekey = ()=>{
  let key = '';
  if(location.href.includes(uat.origin) || location.href.includes(pro.origin)){
    key = '54adcefe02314a44b82dca9b470c4bad';
  }else {
    key = '8190142167af4b30b898827623d57b4d';
  }
  return key
};


export const regex = (prop)=>{
  const config = {
    mobile_phone_: {
      name: '手机号',
      rule: '/1[3|4|5|6|7|8]\/d{9}/'
    },
    password: {
      name: '密码',
      rule: '/\/d{6,12}/'
    },
    code: {
      name: '验证码',
      rule: '\/d{0,6}/'
    },
    code_pic: {
      name: '图形验证码',
      rule: '\/w{0,4}/'
    },
    id_card: {
      name: '身份证',
      rule: '(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)'
    },
    address: {
      name: '地址',
      rule: '/.*[\u4e00-\u9fa5].*/'
    },
  };

  return config[prop].rule

};


let _config;
if(process.env.NODE_ENV === 'production'){
  _config = _default;
}else{
  _config = dev;
}
export default _config
