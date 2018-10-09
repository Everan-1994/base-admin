import {login, logout} from '@/api/user'
import {getRouterReq} from '@/api/routers'
import {setToken, routersConfigAssembly, setLocalStorage, delLocalStorage, delToken} from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        avatorImgPath: '',
        token: '',
        access: ''
    },
    mutations: {
        setAvator(state, avatorPath) {
            state.avatorImgPath = avatorPath;
            setLocalStorage('avator', avatorPath);
        },
        setUserId(state, id) {
            state.userId = id;
            setLocalStorage('id', id);
        },
        setUserName(state, name) {
            state.userName = name;
            setLocalStorage('name', name);
        },
        setAccess(state, access) {
            state.access = access;
            setLocalStorage('access', access);
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        }
    },
    actions: {
        // 登录
        handleLogin({commit}, {userName, password}) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    const data = res.data.data;
                    commit('setToken', `${data.meta.tokenType} ${data.meta.accessToken}`);
                    commit('setAvator', 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png');
                    commit('setUserName', data.userInfo.name);
                    commit('setUserId', data.userInfo.id);
                    commit('setAccess', ['super_admin', 'admin']);
                    resolve(res.data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('setToken', '');
                    commit('setAccess', []);
                    commit('setAvator', '');
                    commit('setUserName', '');
                    commit('setUserId', 0);
                    delLocalStorage('id');
                    delLocalStorage('name');
                    delLocalStorage('avator');
                    delLocalStorage('access');
                    delToken();
                    resolve()
                }).catch(err => {
                    commit('setToken', '');
                    commit('setAccess', []);
                    commit('setAvator', '');
                    commit('setUserName', '');
                    commit('setUserId', 0);
                    delLocalStorage('id');
                    delLocalStorage('name');
                    delLocalStorage('avator');
                    delLocalStorage('access');
                    delToken();
                    reject(err)
                })
            })

        },
        // 获取用户路由
        getRoutersConfig({state, commit}) {
            return getRouterReq().then((routersData) => {
                let routersConfig = _.cloneDeep(routersData.data)
                let newRoutersConfigObj = routersConfigAssembly(routersConfig)
                commit('setRoutersConfig', {newRouters: newRoutersConfigObj, routersData: routersData.data})
                return newRoutersConfigObj
            })
        }

    }
}
