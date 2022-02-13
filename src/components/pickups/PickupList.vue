<template>
  <ion-list>
    <pickup-list-item
      v-for="item in pickups"
      :key="item.id"
      :pickupdetail="item"
    ></pickup-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import PickupListItem from "./PickupListItem.vue";

export default {
  props: ["pickups"],
  components: {
    IonList,
    PickupListItem,
  },
};
</script>
