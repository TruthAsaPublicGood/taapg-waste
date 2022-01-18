<template>
  <base-layout page-title="All Items">
    <template v-slot:actions-end>
      <ion-button router-link="/items/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <items-list :items="items"></items-list>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";

import ItemsList from "../components/items/ItemsList.vue";

export default {
  components: {
    ItemsList,
    IonButton,
    IonIcon
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
