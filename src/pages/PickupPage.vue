<template>
  <base-layout page-title="Pickup history" page-default-back-link="/">
    <template v-slot:actions-end>
      <ion-button router-link="/pickups/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    Today
    <pickups-list :items="items"></pickups-list>
    Older items
    <pickups-list :items="itemsStorage"></pickups-list>
    Cooperative items
    <pickups-list :items="coopitems"></pickups-list>
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
    items() {
      return this.$store.getters.items;
    },
    coopitems() {
      return this.$store.getters.coopitems;
    },
    itemsStorage() {
      return this.$store.state.localStoreItems;
    }
  },
  mounted(){
    this.localStorage()
  },
  methods: {
    localStorage() {
      this.$store.dispatch('actionLocalStorageItems')
    }
  }
};
</script>
