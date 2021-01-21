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
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
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