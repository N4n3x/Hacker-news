<template>
  <div class="layout">
    <vs-navbar 
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar"
    >
      <div slot="title">
        <router-link :to="{ name: 'app' }"><vs-navbar-title> HACKERS NEWS </vs-navbar-title></router-link>
      </div>
      <is-connect>
        <template v-slot:no >
          <vs-navbar-item index="0">
            <router-link :to="{ name: 'register' }">Inscription</router-link>
          </vs-navbar-item>
          <vs-navbar-item index="1">
            <router-link :to="{ name: 'connect' }">Connexion</router-link>
          </vs-navbar-item>
        </template>
        <template v-slot:yes >
          <p>Bonjour {{ username }}</p>
          <router-link :to="{ name: 'connect' }">Déconnexion</router-link>
        </template>
      </is-connect>
      
      <!-- Peut prendre params et query pour passer des paramètres -->
    </vs-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import IsConnect from './components/IsConnect.vue';
import { mapState } from "vuex";
export default {
  components: { IsConnect },
  computed:{
        ...mapState("auth", ["username"]),
    },

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
    font-family: 'Roboto', sans-serif;
    list-style: none;
    text-decoration: none;
}

a {
  color: white;
}

.input-color {
  margin-bottom: 10px;
  position: relative;
  display: block;
}

.myNavbar {
  color: rgba(255, 255, 255, 1);
}
</style>