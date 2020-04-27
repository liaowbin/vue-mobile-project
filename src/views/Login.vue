<template>
  <div class="login">
    <van-form @submit="onSubmit" @failed="reFailed">
      <van-field
        v-model="username"
        name="user"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        clearable
      />
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        right-icon="eye-o"
      />
      <div class="oper">
        <van-checkbox v-model="isCheck" checked-color="#8c64fe" shape="square">记住密码</van-checkbox>
        <p>忘记密码</p>
      </div>
      <div style="margin: 16px;">
        <van-button round block native-type="submit" color="#8c64fe">
          提交
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button round block native-type="submit" color="#8c64fe" plain>
          没有账号，立即注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isCheck: true
    }
  },
  created() {
    if (localStorage.getItem("loginInfo")) {
      this.$router.push('home');
    }
  },
  methods: {
    onSubmit(values) {
      this.$http.post('login', {
        mobile: values.user,
        password: values.pwd
      }).then(response => {
        if (response.status == 200) {
          if (!response.body.status) {
            this.$toast(response.body.info);
          }else {
            if (this.isCheck) {
              var val = { "username": values.user, "password": values.pwd }
              localStorage.setItem("loginInfo", JSON.stringify(val));
            }
            this.$toast('登录成功！');
            this.$router.push('home');
          }
        }
      }, response => {
        this.$toast('登录失败！');
      });
    },
    reFailed(res) {
      console.log(res.errors[0].message);
    }
  },
};
</script>
<style lang="less" scoped>
.login {
  .oper {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    font-size: 14px;
  }
}
</style>
