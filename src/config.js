export const _default = {
  url: `${location.origin}/api/`,
};

export const duxin = {
  url: 'http://192.168.8.161:8506/api/',
};

export const dev = {
  url: 'http://192.168.7.110:8506/api/',
};

export const test = {
  url: 'https://zw-api-test.chinazyjr.net/api/',
};

export const stage = {
  url: 'https://zw-api-stage.chinazyjr.net/api/',
};

export const pro = {
  url: 'https://zw-api.chinazyjr.com/api/',
};


let _config;
if(process.env.NODE_ENV === 'production'){
  _config = test;
}else{
  _config = test;
}
export default _config
