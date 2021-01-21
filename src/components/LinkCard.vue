<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card color="dark">
        <div slot="header">
          <vs-row vs-justify="flex-end">
            <em>Publier par {{ link.createdBy.username }} le {{ link.createdAt | formatDate }}</em>
          </vs-row>
        </div>
        <div>
          <a class="titleLink" :href="link.url"><div><code>{{ link.url | formatLink }}</code></div></a>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-start">
            <router-link :to="{ name: 'linkDetail', params: { id: link.id } }"><vs-button color="primary" type="gradient" icon="turned_in_not">Commentaires</vs-button></router-link>
          </vs-row>
          <vs-row vs-justify="flex-end">
            <vs-button
              class="btnVote"
              type="gradient"
              color="success"
              icon="thumb_up"
              @click="upVote"
            >{{link.upvotesCount}}</vs-button>
            <vs-button
              class="btnVote"
              type="gradient"
              color="danger"
              icon="thumb_down"
              @click="downVote"
            >{{link.downvotesCount}}</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  data(){
    return {
      link: Object,
    }
  },
  props: {
    linkProps: Object
  },
  filters: {
    formatLink(v) {
      let res = "";
      if(v.length > 140){
        res = v.slice(0, 30) + "...";
      }else{
        res = v
      }
      return res
    },
    formatDate(v) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(v);
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/') + " à " + d.getHours() + ":" + d.getMinutes()
    }
  },
  methods:{
    async upVote(){
      await this.$fetchAPI("https://hn-dotnet.herokuapp.com/api/links/" + this.link.id + "/upvote", "PUT", {}, true);
      this.link = await this.$fetchAPI("https://hn-dotnet.herokuapp.com/api/links/" + this.link.id , "GET");
    },
    async downVote(){
      await this.$fetchAPI("https://hn-dotnet.herokuapp.com/api/links/" + this.link.id + "/downvote", "PUT", {}, true);
      this.link = await this.$fetchAPI("https://hn-dotnet.herokuapp.com/api/links/" + this.link.id , "GET");
    }
  },
  mounted(){
    this.link = this.linkProps
  }
};
</script>

<style>
.btnVote {
  margin-left: 0.2rem;
}

em {
  color: gray;
}

.titleLink div {
  background-color: rgb(36, 33, 69);
  color: white;
  padding: 1rem;
  border-radius: 1rem;
}
</style>