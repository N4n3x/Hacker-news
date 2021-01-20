<template>
  <vs-row vs-justify="right">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card color="dark">
        <div slot="header">
          <vs-row vs-justify="flex-end">
            <em>Publier par {{ comment.createdBy.username }} le {{ comment.createdAt | formatDate }}</em>
          </vs-row>
        </div>
        <div>
          <div><code>{{ comment.content }}</code></div>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end">
            <vs-button
              class="btnVote"
              type="gradient"
              color="success"
              icon="thumb_up"
            >{{comment.upvotesCount}}</vs-button>
            <vs-button
              class="btnVote"
              type="gradient"
              color="danger"
              icon="thumb_down"
            >{{comment.downvotesCount}}</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
  filters: {
    formatDate(v) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(v);
      return (
        [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/") +
        " à " +
        d.getHours() +
        ":" +
        d.getMinutes()
      );
    },
  },
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