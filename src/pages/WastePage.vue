<template>
  <base-layout page-title="TaaPG-Waste">
    <template v-slot:actions-end>
      <ion-button router-link="/">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <ion-footer class="ion-no-border ion-position-bottom">
      <ion-toolbar>
        <ion-title>Footer-LOGO</ion-title>
      </ion-toolbar>
    </ion-footer>
  </base-layout>
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
      add
    };
  },
  computed: {
    items() {
      return this.$store.getters.items;
    },
  },
};
</script>
