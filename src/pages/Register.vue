<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
      <vs-card class="card">
        <div slot="header">
          <vs-row vs-justify="center">
            <h2>Inscription</h2>
          </vs-row>
        </div>
        <div>
          <form @submit.prevent="submitForm" class="form">
            <vs-row vs-type="flex" vs-justify="center">
              <vs-input
                label-placeholder="Identifiant"
                class="inputx"
                placeholder=""
                v-model="$v.username.$model"
                :color="$v.username.$invalid ? 'danger' : 'success'"
              />
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center">
              <vs-input
                label-placeholder="Mot de passe (6 char. min)"
                type="password"
                class="inputx"
                v-model="$v.password.$model"
                :color="$v.password.$invalid ? 'danger' : 'success'"
              />
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center">
              <vs-input
                label-placeholder="Confirmation"
                type="password"
                class="inputx"
                placeholder=""
                v-model="$v.confirPassword.$model"
                :color="$v.confirPassword.$invalid ? 'danger' : 'success'"
              />
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center">
              <vs-button :disabled="$v.$invalid" class="inputx" type="gradient" v-on:click="submitForm" >Envoyer</vs-button>
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center" v-if="this.erreur">
              <p>Erreur :/</p>
            </vs-row>
          </form>
          <vs-row vs-type="flex" vs-justify="right">
            <router-link :to="{ name: 'connect' }"><vs-button type="line">Déjà inscrit ?</vs-button></router-link>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
export default {
  data(){
    return {
      username: "",
      password: "",
      confirPassword: "",
      erreur: false,
    }
  },
  methods: {
    async submitForm() {
      // traitement
      if(!this.$v.$invalid){
        let rep = await this.fetchAPI({
          username: this.username,
          password:this.password,
          confirmPassword: this.confirPassword
          });
          console.log(rep);
          if(rep >= 400){
            this.erreur = true;
          }else{
            this.$router.push({ name : "connect" });
          }
          
      }else{
        this.erreur = true;

      }
      // this.$router.push({ name : "app" });
    }, 
    async fetchAPI(body) {
      const res = await fetch("https://hn-dotnet.herokuapp.com/api/accounts", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(body)
      });
      // const rep = await res.json();
      console.log(res);
      return res.status
    },
  },
  validations(){
    return {
      username: {
        required,
      },
      password: {
        required,
        size: (v) => v.length > 5
      },
      confirPassword: {
        required,
        sameAs: (v) => v == this.password,
        size: (v) => v.length > 5
      },
    }
  }
};
</script>

<style>

.form {
  margin-top: 1rem;
}

.card {
  margin-top: 2rem;
}
</style>