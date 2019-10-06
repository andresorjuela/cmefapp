
<template>
  <div class="layout">
    <Layout>
      <Header style="height: 10vh">
        <Menu mode="horizontal" :theme="'dark'" active-name="1">
          <Row>
            <Col span="8">
              <MenuItem name="1"  to="/admin">
                <Icon type="ios-home" />CMEF dashboard
              </MenuItem>
            </Col>
            <Col span="2" offset="14">
              <MenuItem name="2">
              <Icon type="md-log-out"  size="32" @click="logout"/>
              </MenuItem>
            </Col>
          </Row>
        </Menu>
      </Header>
      <Content style="height: 90vh">
          <Row type="flex" justify="start" class="code-row-bg"  style="height: 90vh">
        <Col span="6">
        <Menu :theme="'dark'" active-name="0" style="height: 100%">
          <MenuItem name="0" to="/admin">
            <Icon type="ios-home" />Dashboard
          </MenuItem>
          <MenuItem name="1"  to="/admin/date">
            <Icon type="ios-calendar-outline" />Date Managment
          </MenuItem>
          <MenuItem name="2"  to="/admin/general">
            <Icon type="ios-settings-outline" />General Setting
          </MenuItem>
          <MenuItem name="3"  to="/admin/requests">
            <Icon type="ios-fastforward-outline" />Request's
          </MenuItem>
          <MenuItem name="4" to="/admin/events">
            <Icon type="ios-bookmarks-outline" />Event's
          </MenuItem>
          <MenuItem name="5" to="/admin/list">
            <Icon type="ios-people-outline" />Admin's
          </MenuItem>
        </Menu></Col>
        <Col span="16" style="padding-top: 2vh">
        <router-view />
        </Col>
    </Row>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  data() {
    return {};
  },
  methods:{
    logout(){
      this.$store.commit('SET_LOGIN_STATUS' ,false)
      this.$store.commit('SET_ADMIN_TOKEN', '')
      this.$store.commit('SET_CURRENT_ADMIN', {})
      this.$router.push('login')
    }
  }
};
</script>

