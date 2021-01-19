import { Module } from 'vuex';
import { login } from '/@/api/user';

const state = {
  id: '',
  avatar: ''
}

type StateType = typeof state

const user: Module<StateType, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
  },
  actions: {
    // 登陆
    Login({commit}, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          if (res?.data) {
            if (res.data.code === 200) {
              commit('SET_ID', params.username)
            }
            resolve(res.data)
          }
          else reject(false)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user;