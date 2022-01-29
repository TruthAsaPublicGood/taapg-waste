<template>
  <base-layout
    :page-title="loadedItems ? loadedItems.title : 'Loading...'"
    page-default-back-link="/pickups"
  >
    <h2 v-if="!loadedItems">Could not find a memory for the given id.</h2>
    <item-list-item
      v-for="pi in matchPickItems"
      :key="pi.id"
      :itemdetail="pi"
    ></item-list-item>
  </base-layout>
</template>

<script>
import ItemListItem from "@/components/items/ItemListItem.vue";

export default {
  components: {
    ItemListItem
    // ItemOverview,
  },
  computed: {
    loadedItems() {
      return this.$store.getters.pickup(this.memoryId);
    },
    matchPickItems() {
      return this.$store.getters.matcherPickItems(this.memoryId);
    },
    pairItems: function () {
      return this.$store.state.pairPickupItems[this.loadedItems.id]
    }
  },
  data() {
    return {
      memoryId: this.$route.params.id,
    };
  },
  // watch: {
  //   $route(currentRoute) {
  //     this.memoryId = currentRoute.params.id;
  //   },
  // },
};
</script>
