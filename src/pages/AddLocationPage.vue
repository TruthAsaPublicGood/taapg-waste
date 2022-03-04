<template>
  <base-layout page-title="location" page-default-back-link="/pickups/:id">
    <location-item-form @save-item="save"></location-item-form>
  </base-layout>
</template>

<script>
import LocationItemForm from "../components/items/LocationItemForm.vue";

export default {
  components: {
    LocationItemForm,
  },
  methods: {
    saveItem(itemData) {
      this.$store.dispatch('addItem', itemData);
      this.$router.replace('/members');
    }
  }
};
</script>
