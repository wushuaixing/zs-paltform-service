<template>
  <div class="platform-login-wrapper">
    <div class="login-container">
      <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
        <a-form-model-item>
          <a-input v-model="formInline.user" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
              type="primary"
              html-type="submit"
          >
            Log in
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import {login} from "@/plugin/api/login";

export default {
  name: 'LoginView',
  data() {
    return {
      formInline: {
        user: '',
        password: '',
      },
      login:{
        "loginType": 1,
        "password": "E0KOlDINIzTn04ZP23A2TA==",
        "phone": "17630829902",
        "phoneCode": "",
        "pictureCode": ""
      }
    };
  },
  methods: {
    handleSubmit() {
      login(this.login).then(res=>{
        console.log(res);
      })
    },
  },
}
</script>

<style scoped lang="scss">
.platform-login-wrapper{
  padding-top: 200px;
  .login-container{
    width: 300px;
    height: auto;
    margin: 0 auto;
  }
}
</style>
