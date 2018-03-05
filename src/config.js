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


let _config;
if(process.env.NODE_ENV === 'production'){
  _config = _default;
}else{
  _config = dev;
}
export default _config
