/**
 * Created by gxx on 2017/12/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { middleClone } from '@/until'
import getters from './getters'

const root_state = require('@/config.json').state;  // 本身的state，给重置用

const state = middleClone(root_state); // 复制的state直接用

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  getters,
  mutations: {  // 同步调用
    /**
     * 设置用户信息
     * @param state
     * @param data
     * @constructor
     */
    SET_USER(state, data) {
      state.user = data;
    },
    /**
     * 设置用户信息
     * @param state
     * @param data
     * @constructor
     */
    SET_USER_INFO(state, data) {
      state.user_info = data;
    },
    /**
     * 处理优惠券
     * @param state
     * @param data
     * @constructor
     */
    SET_COUPON(state, data) {
      state.coupon = Object.assign({},state.coupon, data);
      state.coupon.receiveNoList = state.coupon.data.map(t=>t.receiveNo)
    },
    /**
     * 处理优惠券
     * @param state
     * @param data
     * @constructor
     */
    DEL_COUPON(state, data) {
      state.coupon.data = state.coupon.data.filter(t=>{
        return t.couponNo !== data.couponNo
      })
    },
    /**
     * 设置图片验证码的token
     * @param state
     * @param data
     * @constructor
     */
    SET_IMGCODE_TOKEN(state, data) {
      state.token = data
    },
    /**
     * 重置state
     * @param state
     * @constructor
     */
    RESET(state, obj){
      if(obj){
        Object.assign(state,obj)
      }else{
        sessionStorage.clear();
        localStorage.clear();
        Object.assign(state,root_state)
      }
    }
  },
  actions: {  // 异步调用
    set_user({ commit }, data) {
      commit('SET_USER', data)
    },
    set_user_info({ commit }, data) {
      commit('SET_USER_INFO', data)
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })] // 此插件会将stare同步到session中
})


