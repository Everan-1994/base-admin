<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">
          <Icon type="ios-log-out" />
          安全登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal v-model="logoutm" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <p>确定要退出系统吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="loading" @click="logout">确定退出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    import './user.less'
    import {mapActions} from 'vuex'

    export default {
        name: 'User',
        props: {
            userAvator: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                logoutm: false,
                loading: false
            }
        },
        methods: {
            ...mapActions([
                'handleLogOut'
            ]),
            handleClick(name) {
                switch (name) {
                    case 'logout':
                        this.logoutm = true;
                        break
                }
            },
            logout() {
                this.loading = true;
                this.handleLogOut().then(() => {
                    setTimeout(() => {
                        this.logoutm = false;
                        this.loading = false;
                        this.$router.push({
                            name: 'login'
                        })
                    }, 1500);
                }).catch(() => {
                    setTimeout(() => {
                        this.logoutm = false;
                        this.loading = false;
                        this.$router.push({
                            name: 'login'
                        })
                    }, 1500);
                })
            }
        }
    }
</script>
