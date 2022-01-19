<template>
  <div class="welcome-page">
    <base-layout page-title="TaaPG-Waste">
      <template v-slot:actions-end>
        <ion-button router-link="/">
          <ion-icon slot="icon-only" :icon="add"></ion-icon>
        </ion-button>
      </template>
      <div class="collection-button">
        <ion-button @click="newPickup">New collection</ion-button>
      </div>
      <div class="collection-button">
        <ion-button @click="listPickups">Pickup history</ion-button>
      </div>
      <div class="footer-logo">
        <ion-footer class="ion-no-border">
          <ion-toolbar>
            <ion-img :src="logoW" :alt="taaPGWaste"></ion-img>
          </ion-toolbar>
        </ion-footer>
      </div>
    </base-layout>
  </div>
</template>

<script>
import { IonButton, IonIcon, IonFooter } from "@ionic/vue";
import { add } from "ionicons/icons";

export default {
  components: {
    IonButton,
    IonIcon,
    IonFooter
  },
  data() {
    return {
      add,
      logoW:  require('.././assets/logo-waste.png')
    };
  },
  computed: {
    items() {
      return this.$store.getters.items;
    },
  },
  methods: {
    newPickup() {
      console.log('new collection')
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
}

.footer-logo {
  display: flex;
  border: 1px solid red;
}

.logo-imaged {
  align-items: flex-end;
  align-self: flex-end;
}

</style>
