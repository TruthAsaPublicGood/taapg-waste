<template>
  <base-layout page-title="TaaPG-Circular">
    <template v-slot:actions-end>
      <ion-button router-link="/">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <div id="peer-live">
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label>Peer Name:</ion-label>
            <ion-label>{{ getAuthData.peerName }}</ion-label>
          </ion-item>
        </ion-card-content>
    </ion-card>
    </div>
    <div class="collection-button">
      <ion-button @click="newPickup">New collection</ion-button>
    </div>
    <div class="collection-button">
      <ion-button @click="listPickups">Pickup history</ion-button>
    </div>
    <!-- <div>
      <button @click="tagLabalCloud">tagCloud</button>
      tags:
      <ul v-for="tag in taglabels" :key="tag.objectId">
        <li>
          <ion-button>{{ tag.get('wastelabel') }}</ion-button>
        </li>
      </ul>
    </div> -->
    <div class="auth-button">
      <ion-button @click="authEnd" >Sign Out</ion-button>
    </div>
    <div class="footer-logo">
      <ion-img :src="logoW"></ion-img>
    </div>
  </base-layout>
</template>

<script>
import { IonCard, IonCardContent, IonLabel, IonItem, IonButton, IonIcon, IonImg} from "@ionic/vue";
import { add } from "ionicons/icons";
import { mapGetters } from "vuex";

export default {
  components: {
    IonCard,
    IonCardContent,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonImg
  },
  data() {
    return {
      add,
      logoW:  require('.././assets/taspg-circular.png')
    };
  },
  computed: {
    ...mapGetters(['getAuthData'])
  },
  methods: {
    authEnd() {
      this.$store.dispatch('actionEndaccess');
      this.$router.push('/')
    },
    listPickups() {
      this.$router.push('/pickups')
    },
    newPickup() {
      this.$router.push('/pickups/add')
    },
    createMylist () {
      this.$router.push('/mylists')
    },
    agreeTerms () {
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

.collection-button {
  display: flex;
  justify-content: center;
  padding-top: 2em;
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
