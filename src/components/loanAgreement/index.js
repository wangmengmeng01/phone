/**
 * Created by gxx on 2017/7/10.
 */

import Vue from 'vue';

let protocol = require('./protocol.vue');
let Profile = Vue.extend(protocol.default);
const comp = new Profile().$mount();


export default comp.$el.innerHTML
