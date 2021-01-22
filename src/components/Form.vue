<template>
  <div>
    <p>Ma valeur count: {{ count }} et doubleCount: {{ doubleCount }}</p>
    <button @click="$store.commit('counter/increment')">+</button>
    <!-- Autre écriture après le map -->
    <button @click="increment">+</button>
    <button @click="$store.commit('counter/decrement')">-</button>
    <button @click="$store.commit('counter/setValue', 42)">42</button>
    <button @click="$store.dispatch('counter/deplay')">action async</button>
    <button @click="globalFunc">Fonction global</button>
    <button @click="testNotification">notification</button>
    <button @click="fetchAPI">fetchAPI</button>
    <p>Animation avec transition</p>
    <button @click="show = !show"> 🎆 </button>
    <transition name="fade" mode="out-in">
      <p key="one" v-if="show">✨</p>
      <p key="two" v-else>🎇</p>
    </transition>


    <form @submit.prevent="messages.push(messages.length.toString())"><button> More </button></form>
    <transition-group name="bump" tag="div" :style="{ position: 'absolute' }">
      <p v-for="message in messages" :key="message">
        {{ message }}
      </p>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data(){
    return {
      show: false,
      messages: []
    }
  },
  computed: {
    // count(){
    //     return this.$store.state.counter.count
    // }
    ...mapState("counter", ["count"]),
    ...mapGetters("counter", ["doubleCount"]),
  },
  methods: {
    ...mapMutations("counter", ["increment", "decrement"]),
    globalFunc() {
      this.$globalFunction();
    },
    testNotification(event) {
      this.$sendNotif(event);
    },
    async fetchAPI() {
      const res = await this.$fetchAPI(
        "https://hn-dotnet.herokuapp.com/api/links",
        "POST",
        {
            "url": "https://twitter.com"
        },
        true
      );
      // const res = await fetch("https://hn-dotnet.herokuapp.com/api/links");
      // const data = await res.json();
      this.links = res;
      // console.log(data);
    },
  },
};
</script>

<style>
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave, fade-enter-to {
  opacity: 1;
}

.bump-enter-active {
  animation: bump 0.5s ease-in;
  position: relative;
}

@keyframes bump {
  0% {
    transform: scale(0.5);
    font-weight: normal;
  }

  50% {
    transform: scale(4);
    font-weight: bold;
  }

  100% {
    transform: scale(1);
    font-weight: normal;
  }
}
</style>