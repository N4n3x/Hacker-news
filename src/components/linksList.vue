<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <link-card :link="link" />
    </li>
  </ul>
</template>

<script>
import LinkCard from "./LinkCard.vue";

export default {
  components: { LinkCard },
	data(){
		return {
			links: []
		}
	},
  methods: {
    async fetchAPI() {
      const res = await fetch("https://hn-dotnet.herokuapp.com/api/links");
      const data = await res.json();
      this.links = data;
      console.log(data);
    },
  },
  beforeMount() {
    this.fetchAPI();
  },
};
</script>