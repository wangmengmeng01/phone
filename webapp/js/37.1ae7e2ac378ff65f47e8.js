webpackJsonp([37],{"5iqm":function(t,e,i){"use strict";e.a={name:"register",data:function(){return{mobile:""}},methods:{submit:function(){return this.mobile?/^1\d{10}$/.test(this.mobile)?void this.$go("set_pwd",{mobile:this.mobile,view:"register"}):void this.$toask("手机号格式不正确!"):void this.$toask("手机号不能为空!")}}}},c2lw:function(t,e,i){"use strict";function o(t){i("xgAC")}Object.defineProperty(e,"__esModule",{value:!0});var s=i("5iqm"),a=i("iEo5"),r=i("VU/8"),n=o,l=r(s.a,a.a,!1,n,"data-v-42480ec2",null);e.default=l.exports},iEo5:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"register p4"},[i("h2",{staticClass:"text color-font"},[t._v("快速注册")]),t._v(" "),i("p",{staticClass:"text2 f28 color_font-s"},[t._v("录入手机号码将作为您的登录账号")]),t._v(" "),i("div",{staticClass:"item flex phone border-b"},[i("span",{staticClass:"name f44 color_font"},[t._v("手机号")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.mobile,expression:"mobile"}],staticClass:"f44",attrs:{type:"tel",placeholder:"请输入手机号",maxlength:"11"},domProps:{value:t.mobile},on:{input:function(e){e.target.composing||(t.mobile=e.target.value)}}})]),t._v(" "),i("button",{staticClass:"btn",on:{click:t.submit}},[t._v("下一步")]),t._v(" "),i("p",{staticClass:"gologin f32 color_main",on:{click:function(e){t.$go("login",{mobile:t.mobile})}}},[t._v("已有账号，去登录")])])},s=[],a={render:o,staticRenderFns:s};e.a=a},n4xu:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,".register[data-v-42480ec2]{height:100%;background:#fff}.register .item[data-v-42480ec2]{margin-top:1.4rem;padding-bottom:.3rem}.register .item span[data-v-42480ec2]{-webkit-box-flex:1;-ms-flex:1;flex:1}.register .item input[data-v-42480ec2]{-webkit-box-flex:1.5;-ms-flex:1.5;flex:1.5}.register .text[data-v-42480ec2]{padding-top:1rem;font-size:.6rem}.register .text2[data-v-42480ec2]{margin-top:.26rem}.register .btn[data-v-42480ec2]{margin-top:1rem}.register .gologin[data-v-42480ec2]{text-align:center;margin-top:.4rem}",""])},xgAC:function(t,e,i){var o=i("n4xu");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);i("rjj0")("ef53ea38",o,!0)}});