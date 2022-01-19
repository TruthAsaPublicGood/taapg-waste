<template>
  <ion-list>
    <item-list-item
      v-for="item in pickups"
      :key="item.id"
      :pickupdetail="item"
    ></item-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import ItemListItem from "./PickupListItem.vue";

export default {
  props: ["pickups"],
  components: {
    IonList,
    ItemListItem,
  },
};
</script>
