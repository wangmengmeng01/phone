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
     * 处理头部信息
     * @param state
     * @param data
     * @constructor
     */
    DEAL_HEADER(state, data) {
      state.header = data
    },
    /**
     * 设置消息数量
     * @param state
     * @param data
     * @constructor
     */
    SET_MESSAGE(state, data) {
      state.message = data;
    },
    /**
     * 设置用户信息
     * @param state
     * @param data
     * @constructor
     */
    SET_USER(state, data) {
      !data.productId && (data.productId = 'P001007');
      state.user = {...state.user, ...data};
      localStorage.setItem('user',JSON.stringify(state.user));
    },
    /**
     * 处理选择银行卡逻辑
     * @param state
     * @param data
     * @constructor
     */
    DEAL_BANK(state, data) {
      state.bank = {...state.bank, ...data};
    },
    /**
     * 设置显示隐藏的类型
     * @param state
     * @param data
     * @constructor
     */
    VISIBLE(state, data) {
      state.visible[data] = !state.visible[data];
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
    deal_header({ commit }, data) {
      commit('DEAL_HEADER', data)
    },
    set_message({ commit }, data) {
      commit('SET_MESSAGE', data)
    },
    set_user({ commit }, data) {
      commit('SET_USER', data)
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })] // 此插件会将stare同步到session中
})


