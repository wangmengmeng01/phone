// /**
//  * Created by gxx on 2017/11/09.
//  */
import Vue from 'vue';

let Profile = Vue.extend(require('./toask.vue').default);
var el;
class toask {
  constructor(arg) {
    let [msg, time,position,bgc,wordColor] = arg;
    this.component = null;
    this.el = null;
    this.msg = msg;
    this.time = time || 2000;
    this.position= position ||"28%";
    this.bgc= bgc || null;
    this.wordColor= wordColor || null;
    this.init();
  }
  creat() {
    el = this.el = document.createElement('div');
    document.body.appendChild(this.el);
    this.component = new Profile().$mount(this.el);
    this.component.message = this.msg;
    this.component.position = this.position;
    this.component.bgc = this.bgc;
    this.component.wordColor = this.wordColor;
    this.show();
  }
  show() {
    if (el) {
      this.close();
    }
    this.component.visible = true;
    setTimeout(() => {
      this.close();
    }, this.time)
  }
  close() {
    this.component.visible = false
  }
  init() {
    this.creat();
  }
}


Vue.prototype.$toask = (...r) => new toask(r)
