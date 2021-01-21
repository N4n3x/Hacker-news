import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import LinkDetails from './components/LinkDetails';
import Form from './components/Form';
import Layout from './Layout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Connect from './pages/Connect';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(Vuesax);



const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules:{
    auth: {
      namespaced: true,
      state: {
        token: null,
        username: null,
        justRegister: false,
      },
      mutations: {
        setToken(state, value){
          state.token = value;
        },
        setUsername(state, value){
          state.username = value;
        },
        setJustRegister(state, value){
          state.justRegister = value;
        },
      },
    },
    counter: {
      namespaced: true,
      state: {
        count: 0,
      },
      mutations: {
        increment(state) {
          state.count++;
        },
        decrement(state){
          state.count--;
        },
        setValue(state, value){
          state.count = value;
        },
      },
      actions: {
        deplay(context){
          context.commit('increment');
          setTimeout(() => context.commit("decrement"), 5000);
        }
      },
      getters: {
        doubleCount(state){
          return state.count * 2;
        }
      }
    }
  }
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

Vue.use({
  install(v){
    v.prototype.$globalFunction = function(event){
      console.log("Ma fonction global", this, event)
      // attention, this disponible si call depuis methods
    }
    v.prototype.$sendNotif = function(titre,message,color){
      this.$vs.notify({title: titre, text: message, color: color});
    }
    v.prototype.$fetchAPI = async function(url, method="GET", body=false, auth=false){
      let headers;
      let res;
      if(auth){
        headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.state.auth.token
        }
      }else{
        headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      if(body){
        res = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(body)
        });
      }else{
        res = await fetch(url, {
          method: method,
          headers: headers,
        });
      }
      console.log(res);
      if(res.status == 401){
        this.router.push({ name : "connect" });
      }else{
        if(res.statusText != "No Content"){
          const data = await res.json();
        // console.log(data);
          return data;
        }else{
          return res.status

        }
        
        
      }
      
    }
  }
});

router.beforeEach((to, from, next) => {
  if(to.name != "register" && to.name != "connect" ){
    if(!store.state.auth.token){
      router.push({ name : "connect" });
    }
  }
  console.log(to,from);
  document.title = to.meta.title;
  next();
});

// router.afterEach((to, from) => {
//   console.log(to,from);
//   document.title = to.meta.title;
// });

new Vue({
  store,
  router,
  render: h => h(Layout),
}).$mount('#app')
