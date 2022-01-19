<template>
  <base-layout page-title="Add pickup" page-default-back-link="/pickups">
    <create-item-form @save-pickup="savePickup"></create-item-form>
  </base-layout>
</template>

<script>
import CreateItemForm from "../components/pickups/CreatePickupForm.vue";

export default {
  components: {
    CreateItemForm,
  },
  methods: {
    savePickup(pickupData) {
      this.$store.dispatch('addPickup', pickupData);
      this.$router.replace('/pickups');
    }
  }
};
</script>
