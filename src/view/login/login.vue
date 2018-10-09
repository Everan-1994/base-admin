<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="md-pulse" title="都安全医疗" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit" :load="loading"></login-form>
                    <p class="login-tip">【都安全官网】 -- 后台</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import LoginForm from '_c/login-form'
    import {mapActions} from 'vuex'

    export default {
        components: {
            LoginForm
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions([
                'handleLogin',
                'getRoutersConfig'
            ]),
            handleSubmit({userName, password}) {
                const _this = this;
                _this.loading = true;
                _this.handleLogin({userName, password}).then(res => {
                    if (res.data.errorCode === 10001) {
                        setTimeout(() => {
                            _this.loading = false;
                            _this.$Message.error(res.data.message || '系统错误');
                        }, 1000);
                    } else {
                        _this.$Message.loading({
                            content: '登录系统中...',
                            duration: 1.5,
                            onClose: function() {
                                _this.loading = false;
                                Promise.all([_this.getRoutersConfig()]).then(res => {
                                    // 注册新路由配置
                                    _this.$router.addRoutes(res[0])
                                    _this.$router.push({
                                        name: 'home'
                                    })
                                });
                            },
                        });
                    }
                }).catch(err => {
                    setTimeout(() => {
                        console.log('err', err)
                        _this.loading = false;
                        // _this.$Message.error(err.response.data.message || '系统错误');
                    }, 1000);
                })
            }
        }
    }
</script>

<style>

</style>
