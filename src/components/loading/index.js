import Vue from 'vue';

let time = null;
let Profile = Vue.extend(require('./loading.vue').default);
var el;
class loading{
    constructor(time){
        this.time = time || 30000;
    }
    creat(){
        this.el = document.createElement('div');
        document.body.appendChild(this.el);
        el = this.component = new Profile().$mount(this.el);
    }
    open(){
        if(el){
          this.close();
        }
        this.creat();
        this.component.visible = true;
        time = setTimeout(()=>{
            this.close();
        }, this.time)
    }
    close(){
        clearTimeout(time)
        this.component.visible = false
    }
}

export default new loading








// const Indicator = Vue.extend(require('./loading.vue'));
// let instance;
// let timer;

// module.exports = {
//     open(options = {}) {
//         if (!instance) {
//             instance = new Indicator({
//                 el: document.createElement('div')
//             });
//         }
//         if (instance.visible) return;
//         instance.text = typeof options === 'string' ? options : options.text || '';
//         instance.spinnerType = options.spinnerType || 'snake';
//         document.body.appendChild(instance.$el);
//         if (timer) {
//             clearTimeout(timer);
//         }

//         Vue.nextTick(() => {
//             instance.visible = true;
//         });
//     },

//     close() {
//         if (instance) {
//             instance.visible = false;
//             timer = setTimeout(() => {
//                 if (instance.$el) {
//                     instance.$el.style.display = 'none';
//                 }
//             }, 400);
//         }
//     }
// };
