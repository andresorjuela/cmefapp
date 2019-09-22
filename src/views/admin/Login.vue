<template>
  <div class="loginPage">
    <Card style="width:320px" title="Welcome to CMEF APP Dashboard">
      <div style="text-align:center">
        <Input
          prefix="ios-contact"
          size="large"
          v-model="username"
          placeholder="Enter Username..."
        />
        <div class="mt-2">
          <Input
            prefix="ios-key-outline"
            type="password"
            size="large"
            v-model="password"
            placeholder="Enter you Password"
          />
        </div>
        <div class="mt-2">
          <Button type="success" long @click="submitLogin">Login</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "marahman",
      password: "anis123"
    };
  },
  methods: {
    ...mapActions({
      adminLogin: "adminLogin",
      getDBStats: "getDBStats"
    }),
    submitLogin() {
      let that = this;
      if (that.username == "" || that.password == "") {
        this.$Message.error("Username and Password required");
      } else {
        let data = {
          username: that.username,
          password: that.password
        };
        that
          .adminLogin(data)
          .then(res => {
            this.$Message.success(res.message);
          })
          .catch(err => {
            this.$Message.error(err.message);
          });
      }
    }
  },
  mounted(){
    this.getDBStats()
  }
};
</script>

<style scoped>
.loginPage {
  background-color: rgb(236, 102, 8);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mt-2 {
  margin-top: 2vh;
}
</style>
