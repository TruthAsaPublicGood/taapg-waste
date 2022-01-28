<template>
  <base-layout page-title="Add a item" page-default-back-link="/pickups/:id">
    <create-item-form @save-item="saveItem"></create-item-form>
  </base-layout>
</template>

<script>
import CreateItemForm from "../components/items/CreateItemForm.vue";

export default {
  components: {
    CreateItemForm,
  },
  methods: {
    saveItem(itemData) {
      this.$store.dispatch('addItem', itemData);
      this.$router.replace('/items');
    }
  }
};
</script>
