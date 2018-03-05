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
     * 设置token
     * @param state
     * @param data
     * @constructor
     */
    SET_TOKEN(state, data) {
      state.token = data;
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
    set_token({ commit }, data) {
      commit('SET_TOKEN', data)
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


