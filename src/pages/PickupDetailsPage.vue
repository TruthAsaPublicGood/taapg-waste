<template>
  <base-layout
    :page-title="loadedItems ? loadedItems.title : 'Loading...'"
    page-default-back-link="/pickups"
  >
    <h2 v-if="!loadedItems">Could not find a memory for the given id.</h2>
    <item-overview
      v-else
      :title="loadedItems.title"
      :image="loadedItems.image"
      :description="loadedItems.description">
    </item-overview>
  </base-layout>
</template>

<script>
import ItemOverview from "../components/pickups/PickupOverview.vue";

export default {
  components: {
    ItemOverview,
  },
  data() {
    return {
      memoryId: this.$route.params.id,
    };
  },
  computed: {
    loadedItems() {
      return this.$store.getters.pickup(this.memoryId);
    },
  },
  // watch: {
  //   $route(currentRoute) {
  //     this.memoryId = currentRoute.params.id;
  //   },
  // },
};
</script>
