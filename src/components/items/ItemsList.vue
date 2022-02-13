<template>
  <ion-list>
    <item-list-item
      v-for="item in items"
      :key="item.id"
      :itemdetail="item"
    ></item-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import ItemListItem from "./ItemListItem.vue";

export default {
  props: ["items"],
  components: {
    IonList,
    ItemListItem,
  },
};
</script>
