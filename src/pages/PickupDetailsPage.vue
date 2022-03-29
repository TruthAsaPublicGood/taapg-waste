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
      if (this.typeId === 'network') {
        return this.$store.getters.networkMatcher(this.giftId);
      } else {
        return this.$store.getters.itemMatcher(this.giftId);
      }
    },
    matchGroupItems() {
      if (this.typeId === 'network') {
        return this.$store.getters.networkMatcherDetail(this.giftId);
      } else {
        return this.$store.getters.matcherGroupItems(this.giftId);
      }
    },
    /* matchPickItems() {
      console.log(this.$store.getters.matcherPickItems(this.giftId))
      return this.$store.getters.matcherPickItems(this.giftId);
    } */
  },
  data() {
    return {
      giftId: this.$route.params.id,
      typeId: this.$route.params.ty
    };
  },
  // watch: {
  //   $route(currentRoute) {
  //     this.giftId = currentRoute.params.id;
  //   },
  // },
};
</script>
