<template>
  <div class="layout">
    <vs-navbar 
      v-model="indexActive"
      color="rgba(29,25,77,1)"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar"
    >
      <div slot="title">
        <vs-navbar-title> HACKERS NEWS </vs-navbar-title>
      </div>
      <vs-navbar-item index="0"
        ><router-link :to="{ name: 'app' }">Home</router-link></vs-navbar-item
      >
      <vs-navbar-item index="1"
        ><router-link :to="{ name: 'form' }">Form</router-link></vs-navbar-item
      >
      <!-- Peut prendre params et query pour passer des paramètres -->
    </vs-navbar>
    <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
    font-family: 'Roboto', sans-serif;
    list-style: none;
}

.input-color {
  margin-bottom: 10px;
  position: relative;
  display: block;
}

.myNavbar {
  color: rgb(255, 255, 255);
}
</style>