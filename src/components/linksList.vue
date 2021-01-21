<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <link-card :linkProps="link" />
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
      const res = await this.$fetchAPI("https://hn-dotnet.herokuapp.com/api/links");
      this.links = res;
    },
  },
  beforeMount() {
    this.fetchAPI();
  },
};
</script>

<style>
li {
	margin-bottom: 1rem;
}
</style>