<template>
  <base-layout page-title="TaaPG-Circular">
    <template v-slot:actions-end>
      <ion-button router-link="/">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <div id="auth-flow" class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label floating>Username</ion-label>
          <ion-input type="text" value="" v-model="peerInfo.peer"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Password</ion-label>
          <ion-input type="password" value="" v-model="peerInfo.pw"></ion-input>
        </ion-item>
      </ion-list>
      <div class="auth-button">
        <ion-button @click="authStart" >Sign In</ion-button>
      </div>
    </div>
    <div class="collection-button">
      <ion-button @click="agreeTerms">Consent & Privacy</ion-button>
    </div>
    <div class="footer-logo">
      <ion-img :src="logoW"></ion-img>
    </div>
  </base-layout>
</template>

<script>
import { IonList, IonInput, IonLabel, IonButton, IonItem, IonIcon, IonImg} from "@ionic/vue";
import { add } from "ionicons/icons";
import { mapGetters, mapActions} from "vuex";

export default {
  components: {
    IonList,
    IonInput,
    IonLabel,
    IonButton,
    IonItem,
    IonIcon,
    IonImg,
  },
  data() {
    return {
      add,
      logoW:  require('.././assets/taspg-circular.png'),
      peerInfo:
      {
        peer: '',
        pw: ''
      }
    };
  },
  computed: {
    ...mapGetters(['getLoginStatus']),
  },
  methods: {
    ...mapActions(['actionAuthStart']),
    async authStart () {
      if (this.peerInfo.peer && this.peerInfo.pw) {
        await this.actionAuthStart(this.peerInfo);
        if(this.getLoginStatus === "success"){
          alert('login succes');
        } else {
          alert('falied to login')
        }
      }
      this.peerInfo.pw = ''
    },
    agreeTerms () {
      console.log('view holism-DSC')
      this.$router.push('/holismdsc')
    }
  },
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
}

.auth-button {
  display: flex;
  justify-content: center;
  padding-top: 2em;
  padding-bottom: 2em;
}

.collection-button {
  display: flex;
  justify-content: center;
  padding-top: 4em;
  border-top: 1px solid grey;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 0px solid red;
  height: 380px;
}

.logo-imaged {
  align-items: flex-end;
  align-self: flex-end;
}

</style>
