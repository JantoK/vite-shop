<template>
    <div class="welcome">
        <a-card class="welcome-login _col">
          <div class="welcome-login-logo _row">
            <img src="/@/assets/images/logo.png">
            <h1>樱淘商城</h1>
          </div>
          <a-form class="welcome-login-form"
                  layout="horizontal"
                  :model="account"
                  @submit="submitLogin"
                  @submit.prevent>
            <a-form-item>
              <a-input placeholder="username"
                       v-model:value="account.username">
                <template v-slot:prefix>
                  <user-outlined/>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password placeholder="password"
                                v-model:value="account.password">
                <template v-slot:prefix>
                  <lock-outlined/>
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                htmlType="submit"
                :loading="loading">
                登陆
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { UserOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'Welcome',
    components: { UserOutlined, LockOutlined, EyeOutlined },
    setup() {
      const state = reactive({
        loading: false,
        account: {
          username: '',
          password: ''
        }
      })

      const store = useStore()

      const submitLogin = async () => {
        const { username, password } = state.account
        if(username.trim() === '' || password.trim() === '') return message.warning('用户名或密码不能为空！')
        const params = { username, password }

        const hide = message.loading('登陆中...')
        state.loading = true

        store.dispatch('user/Login', params)
        .then(res=>{
          if(res.code === 200) message.success( res?.msg || '登陆成功!')
          else message.error( res?.msg || '登陆失败!' )
        })
        .catch(err=>{
          message.error('请求失败!请检查网络是否正常!')
        }).finally(()=>{
          state.loading = false
          hide()
        })
      }

      return {
        ...toRefs(state),
        submitLogin
      }
    }
})
</script>

<style lang="scss" scoped>
.welcome {
  width: 100vw;
  height: 100vh;
  background-size: 100%;
  display: flex;
  background-image: url("/@/assets/images/bg.jpg");
  &-login {
    width: 400px;
    min-width: 400px;
    border-radius: 24px;
    margin: auto auto;
    text-align: center;
    &-logo {
      margin-bottom: 14px;
      justify-content: center;
      img {
        width: 48px;
        height: 48px;
        margin-right: 10px;
      }
    }
    &-form {
      justify-content: center;
      ::v-deep(.ant-col){
          width: 100%;
      }
    }
  }
}
</style>
