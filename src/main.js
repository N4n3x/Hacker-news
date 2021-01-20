import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import Form from './components/Form';
import Layout from './Layout';
import NotFound from './pages/NotFound'

Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.use(Vuesax, {
  // options here
});

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/app',
    },
    {
      path: '/form',
      component: Form,
      name: "form"
    },
    {
      path: '/app',
      component: App,
      name: "app"
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

new Vue({
  router,
  render: h => h(Layout),
}).$mount('#app')
