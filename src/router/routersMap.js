const Main = () => import('@/view/main')
const ParentView = () => import('@/components/parent-view')
const Login = () => import('@/view/login/login.vue')
const Home = () => import('@/view/single-page/home')
const Error401 = () => import('@/view/error-page/401.vue')
const Error500 = () => import('@/view/error-page/500.vue')
const Error404 = () => import('@/view/error-page/404.vue')
const Markdown = () => import('@/view/components/markdown/markdown.vue')
const Editor = () => import('@/view/components/editor/editor.vue')

export const routerMap = {
    Main,
    ParentView,
    Login, Home,
    Error401,
    Error500,
    Error404,
    Markdown,
    Editor,
}
export const staticRouters = [
    { path: '/login', name: 'login', meta: { title: 'Login - 登录', hideInMenu: true }, component: routerMap['Login'] },
    { path: '/', name: '_home', redirect: '/home', meta: { notCache: true, hideInMenu: true }, component: routerMap['Main'], children: [{ path: '/home', name: 'home', meta: { notCache: true, hideInMenu: true, title: '首页' }, component: routerMap['Home'] }] },
    { path: '/401', name: 'error_401', meta: { hideInMenu: true }, component: routerMap['Error401'] },
    { path: '/500', name: 'error_500', meta: { 'hideInMenu': true }, component: routerMap['Error500'] },
    { path: '*', name: 'error_404', meta: { hideInMenu: true }, component: routerMap['Error404'] }
  ]