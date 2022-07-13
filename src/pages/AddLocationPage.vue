<template>
  <base-layout page-title="location" page-default-back-link="/pickups/:id">
    <location-item-form @save-location="saveLocation"></location-item-form>
  </base-layout>
</template>

<script>
import LocationItemForm from "../components/items/LocationItemForm.vue";

export default {
  components: {
    LocationItemForm,
  },
  methods: {
    saveLocation(locationData) {
      this.$store.dispatch('addLocation', locationData);
      this.$router.replace('/member');
    }
  }
};
</script>
