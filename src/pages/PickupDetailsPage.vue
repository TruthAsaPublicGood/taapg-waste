<template>
  <base-layout
    :page-title="loadedItems ? loadedItems.title : 'Loading...'"
    page-default-back-link="/pickups"
  >
    <h2 v-if="!loadedItems">Could not find a memory for the given id.</h2>
    <!-- <item-overview
      v-else
      :title="loadedItems.title"
      :image="loadedItems.image"
      :description="loadedItems.description">
    </item-overview> -->
    <!-- need to get a list at this stage -->
    <ion-item v-for="pi in pairItems" :key="pi.id">
      list {{ pi }}
    </ion-item>
  </base-layout>
</template>

<script>
// import ItemOverview from "../components/pickups/PickupOverview.vue";

export default {
  components: {
    // ItemOverview,
  },
  computed: {
    loadedItems() {
      return this.$store.getters.pickup(this.memoryId);
    },
    pairItems: function () {
      console.log('pair items')
      console.log(this.loadedItems.id)
      console.log(this.$store.state.pairPickupItems)
      console.log(this.$store.state.pairPickupItems[this.loadedItems.id])
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
