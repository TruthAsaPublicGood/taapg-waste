<template>
  <base-layout page-title="item description" page-default-back-link="/member">
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
      this.$store.dispatch('addItemInfo', itemData);
      this.$router.replace('/items/location/');
    }
  }
};
</script>
