<template>
  <base-layout page-title="Pickup history" page-default-back-link="/">
    <template v-slot:actions-end>
      <ion-button router-link="/pickups/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <pickups-list :pickups="pickups"></pickups-list>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";

import PickupsList from "../components/pickups/PickupList.vue";

export default {
  components: {
    PickupsList,
    IonButton,
    IonIcon
  },
  data() {
    return {
      add
    };
  },
  computed: {
    pickups() {
      return this.$store.getters.pickups;
    },
  },
};
</script>
