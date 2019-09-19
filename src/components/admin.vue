<template>
  <section>
    <Row justify="space-around" style="padding: 1vh 2vw;">
      <Col span="6">
        <h1>Active Admins</h1>
      </Col>
      <Col span="2" offset="14">
        <Button type="info" @click="newAdminModel = true">Add New</Button>
      </Col>
    </Row>
    <Table border :columns="setting" :data="adminList"></Table>
    <!-- Add new Admin -->
    <Modal
      v-model="newAdminModel"
      title="Add New Admin"
      ok-text="Cancel"
      cancel-text=" "
      @on-ok="newAdminModel = false"
      @on-cancel="newAdminModel = false"
    >
      <div style="text-align:center">
        <Input prefix="ios-contact" size="large" v-model="name" placeholder="New Admin Name..." />
        <div class="mt-2">
          <Input
            prefix="ios-contact"
            size="large"
            v-model="username"
            placeholder="New Admin Username"
          />
        </div>
        <div class="mt-2">
          <Input
            prefix="ios-key-outline"
            size="large"
            v-model="password"
            placeholder="New Admin Password"
          />
        </div>
        <div class="mt-2">
          <Button type="success" long @click="createAdmin">Create Admin</Button>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      newAdminModel: false,
      name: "",
      username: "",
      password: "",
      updateAdminModel: false,
      setting: [
        {
          title: "Name",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "Username",
          key: "username"
        },
        {
          title: "Status",
          key: "status"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      statusList: [
        {
          value: "true",
          label: "Active"
        },
        {
          value: "false",
          label: "Restrict"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      adminList: "getAdminList"
    })
  },
  methods: {
    ...mapActions({
      getAllAdmins: "getAllAdmins",
      AddNewAdmin: "AddNewAdmin",
      deleteAdmin: "deleteAdmin"
    }),
    remove(index) {
      let that = this;
      let admin = that.adminList[index];
      this.$Modal.warning({
        title: "Delete Admin?",
        content: `Are you sure to delete <b>${admin.name}</b>`,
        cancelText: "Close",
        okText: "Delete",
        onOk: function() {
          let data = {
            id: admin._id
          };
          that.deleteAdmin(data);
        }
      });
    },
    createAdmin() {
      let that = this;
      if (!that.name || that.name == "") {
        this.$Message.error("Name required");
      } else if (!that.username || that.username == "") {
        this.$Message.error("Username required");
      } else if (!that.password || that.password == "") {
        this.$Message.error("Password required");
      } else {
        let data = {
          name: that.name,
          username: that.username,
          password: that.password
        };
        that
          .AddNewAdmin(data)
          .then(res => {
            this.$Message.success(res.message);
            (that.newAdminModel = false),
              (that.name = ""),
              (that.username = ""),
              (that.password = "");
          })
          .catch(err => {
            this.$Message.error(err.message);
          });
      }
    }
  },
  mounted() {
    this.getAllAdmins();
  }
};
</script>

<style>
.mt-2 {
  margin-top: 2vh;
}
</style>
