<template>
  <base-layout
    :page-title="loadedItems ? loadedItems.id: 'Loading...'"
    page-default-back-link="/pickups"
  >
    <h2 v-if="!loadedItems">Could not find a memory for the given id.</h2>
    <item-detail
      :itemDetail="loadedItems"
      :itemInfo="matchGroupItems"
    ></item-detail>
  </base-layout>
</template>

<script>
import ItemDetail from "@/components/items/ItemOverviewLong.vue";

export default {
  components: {
    ItemDetail
    // ItemOverview,
  },
  computed: {
    loadedItems() {
      return this.$store.getters.itemMatcher(this.memoryId);
    },
    matchGroupItems() {
      return this.$store.getters.matcherGroupItems(this.memoryId);
    },
    /* matchPickItems() {
      console.log(this.$store.getters.matcherPickItems(this.memoryId))
      return this.$store.getters.matcherPickItems(this.memoryId);
    } */
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
