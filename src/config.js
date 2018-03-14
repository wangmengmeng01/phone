export const _default = {
  url: `${location.origin}/zw/api/`,
};

export const duxin = {
  url: 'http://192.168.8.161:8506/zw/api/',
};

export const dev = {
//url: 'http://192.168.8.161:8506/zw/api/',
//   url: 'http://192.168.7.110:8506/zw/api/',
  // url: 'https://zw-api.chinazyjr.net/zw/api/',
};

export const test = {
    // url: 'http://192.168.7.110:8506/zw/api/',
  url: 'https://zw-api.chinazyjr.net/',
};

export const uat = {
  url: 'https://192.168.7.110:8506/zw/api/',
};

export const pro = {
  url: 'https://192.168.7.110:8506/zw/api/',
};


let _config;
if(process.env.NODE_ENV === 'production'){
  _config = _default;
}else{
  _config = test;
}
export default _config
