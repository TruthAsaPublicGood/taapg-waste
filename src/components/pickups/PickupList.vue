<template>
  <ion-list>
    <pickup-list-item
      v-for="item in items"
      :key="item.id"
      :pickupdetail="item"
      :type="type"
    ></pickup-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import PickupListItem from "./PickupListItem.vue";

export default {
  props: ["items", "type"],
  components: {
    IonList,
    PickupListItem,
  },
};
</script>
