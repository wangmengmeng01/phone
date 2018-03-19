/**
 * Created by gxx on 2017/7/10.
 */

import Vue from 'vue';

let msgQueue = [];
let currentMsg=null;
let el;
let Profile = Vue.extend(require('./alert.vue').default);
class alert{
  constructor(arg){
    let title, content, type, yes ,no;
    typeof arg === 'object'
      ?
        {title, content, type, yes, no}  = arg
      :
        title = arg;
    this.callback = defaultCallback;
    this.content = content;
    this.component = null;
    this.title = title;
    this.type = type;
    this.yes = yes;
    this.el = null;
    this.no = no;
    this.init();
    return new Promise((resolve, reject)=>{ // eslint-disable-line
        msgQueue.push({
            resolve,
            reject
        });
        currentMsg = msgQueue.shift();
        this.callback = defaultCallback;
    });
  }
  creat(){
    el = this.el = document.createElement('div');
    document.body.appendChild(this.el);
    this.component = new Profile().$mount(this.el);
    this.component.callback = this.callback;
    this.component.content = this.content;
    this.component.title = this.title;
    this.component.type = this.type;
    this.component.yes = this.yes || '确定';
    this.component.no = this.no || '取消';
    this.show();
  }
  show(){
    if(el){
      this.close();
    }
    this.component.visible = true;
  }
  close(){
    this.component.visible = false
  }
  init(){
    this.creat();
  }
}


const defaultCallback = action => {
  currentMsg.resolve(action);
};

Vue.prototype.$alert = (r) => new alert(r)
