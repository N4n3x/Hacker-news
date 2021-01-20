<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card>
        <div slot="header">
          <vs-row vs-justify="flex-end">
            <p>Publier par {{ link.createdBy.username }} le {{ link.createdAt | formatDate }}</p>
          </vs-row>
        </div>
        <div>
          <a :href="link.url">{{ link.url | formatLink }}</a>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-start">
              <!-- Mon vote -->
            <vs-button
              v-if="link.myVote != null && link.myVote == 0"
              type="gradient"
              color="success"
              
            >{{link.myVote}}</vs-button>
            <vs-button
              v-else
              type="gradient"
              color="rgb(230,230,230)"
              color-text="rgb(50,50,50)"
            >0</vs-button>
          </vs-row>
          <vs-row vs-justify="flex-end">
            <vs-button
              class="btnVote"
              type="gradient"
              color="success"
              icon="thumb_up"
            >{{link.upvotesCount}}</vs-button>
            <vs-button
              class="btnVote"
              type="gradient"
              color="danger"
              icon="thumb_down"
            >{{link.downvotesCount}}</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  props: {
    link: Object
  },
  filters: {
    formatLink(v) {
      return v.slice(0, 30) + "...";
    },
    formatDate(v) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(v);
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/') + " à " + d.getHours() + ":" + d.getMinutes()
    }
  },
};
</script>

<style>
.btnVote {
  margin-left: 0.2rem;
}
</style>