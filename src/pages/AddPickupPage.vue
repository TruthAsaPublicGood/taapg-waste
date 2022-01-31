<template>
  <base-layout page-title="new pickup" page-default-back-link="/pickups">
    <create-pickup-form ></create-pickup-form>
  </base-layout>
</template>

<script>
import CreatePickupForm from "../components/pickups/CreatePickupForm.vue";

export default {
  components: {
    CreatePickupForm,
  },
  methods: {
    saveSetPickup(pickupData) {
      this.$store.dispatch('addPickup', pickupData);
      // this.$router.replace('/pickups');
    }
  }
};
</script>
