<template>
  <ion-list>ii {{ items }}
    <pickup-list-item
      v-for="item in items"
      :key="item.id"
      :pickupdetail="item"
    ></pickup-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import PickupListItem from "./PickupListItem.vue";

export default {
  props: ["items"],
  components: {
    IonList,
    PickupListItem,
  },
};
</script>
