<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
      <vs-card class="card">
        <div slot="header">
          <vs-row vs-justify="center">
            <h2>Connexion</h2>
          </vs-row>
        </div>
        <div>
          <form @submit.prevent="submitForm" class="form">
            <vs-row vs-type="flex" vs-justify="center">
              <vs-input
                label="Identifiant"
                class="inputx"
                placeholder=""
                v-model="$v.usernameTemp.$model"
              />
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center">
              <vs-input
                label="Mot de passe"
                type="password"
                class="inputx"
                placeholder=""
                v-model="$v.password.$model"
              />
            </vs-row>
            <vs-row vs-type="flex" vs-justify="center">
              <vs-button :disabled="$v.$invalid" class="inputx" type="gradient" v-on:click="submitForm" >Envoyer</vs-button>
            </vs-row>
          </form>
          <vs-row vs-type="flex" vs-justify="right">
            <router-link :to="{ name: 'register' }"><vs-button type="line">Pas inscrit ?</vs-button></router-link>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { required } from 'vuelidate/lib/validators';
export default {
  computed: {
    ...mapState("auth",["token", "username", "justRegister"]),
  },
  data(){
    return {
      usernameTemp: "",
      password: ""
    }
  },
  methods: {
    ...mapMutations("auth",["setToken", "setUsername", "setJustRegister"]),
    async submitForm() {
      // traitement
      if(!this.$v.$invalid){
        console.log("valide !",this.usernameTemp,this.password);
        let rep = await this.fetchAPI({
          username: this.usernameTemp,
          password:this.password
          });
          console.log(rep);
          this.setToken(rep.token);
          this.setUsername(rep.username);
          this.$router.push({ name : "app" });
      }else{
        console.log("invalide !",this.usernameTemp,this.password,this.confirPassword);
      }
      // this.$router.push({ name : "app" });
    }, 
    async fetchAPI(body) {
      const res = await fetch("https://hn-dotnet.herokuapp.com/api/accounts/token", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(body)
      });
      const data = await res.json();
      return data
    },
    isJustRegistered(){
      if(this.justRegister){
        this.$sendNotif("Compte créé !", "Votre compte a bien été créé, merci je vous connecter.", "success")
        this.setJustRegister(false);
      }
      
    },
  },
  validations(){
    return {
      usernameTemp: {
        required,
      },
      password: {
        required,
      },
      
    }
  },
  mounted(){
    this.isJustRegistered();
    this.setToken(null);
  }
};
</script>

<style>
.inputx {
  margin-bottom: 1rem;
}

.form {
  margin-top: 1rem;
}

.card {
  margin-top: 2rem;
}
</style>