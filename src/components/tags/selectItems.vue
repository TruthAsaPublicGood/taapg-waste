<template>
  <base-layout page-title="Select items" page-default-back-link="/">
    <ion-item>
      Select the item(s) most like what you need:
    </ion-item>
    <ion-list v-for="bed in beds" :key='bed'>
      <ion-img :src="bed.image" :alt="bed.title"></ion-img>
      <!-- <h2 class="ion-text-center">{{ bed.title }}</h2>
      <p class="ion-text-center">{{ bed.description }}</p> -->
      <ion-button>select</ion-button>
    </ion-list>
  </base-layout>
</template>

<script>
import { IonList, IonButton, IonImg, IonItem } from "@ionic/vue";

export default {
  props: [],
  components: {
    IonList,
    IonButton,
    IonImg,
    IonItem,
  },
  computed: {
    beds() {
      return this.$store.getters.beds
    },
  }
};
</script>
