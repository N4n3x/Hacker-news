import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import LinkDetails from './components/LinkDetails';
import Form from './components/Form';
import Layout from './Layout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Connect from './pages/Connect';


Vue.use(VueRouter);
Vue.use(Vuelidate);
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
      path: '/inscription',
      component: Register,
      name: "register",
      meta: { title : "Inscription" }

    },
    {
      path: '/connexion',
      component: Connect,
      name: "connect",
      meta: { title : "Connexion" }
    },
    {
      path: '/form',
      component: Form,
      name: "form",
      meta: { title : "Edition" }
    },
    {
      path: '/app',
      component: App,
      name: "app",
      props: (route) => ({
        order: route.query.order
      }),
      meta: { title : "Hacker News" }
    },
    {
      path: '/link/:id',
      component: LinkDetails,
      name: "linkDetail",
      // props: true,
      props: (route) => ({
        linkId: route.params.id
      })
    },
    {
      path: '/404',
      component: NotFound,
      name: "404"
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   console.log(to,from);
//   document.title = to.meta.title;
//   next();
// });

router.afterEach((to, from) => {
  console.log(to,from);
  document.title = to.meta.title;
});

new Vue({
  router,
  render: h => h(Layout),
}).$mount('#app')
