<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card color="dark">
        <div slot="header">
          <h2>Nouveau lien</h2>
        </div>
        <div>
          <form ></form>
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
  methods:{
    
  },
  mounted(){
    this.link = this.linkProps
  }
};
</script>

<style>

</style>