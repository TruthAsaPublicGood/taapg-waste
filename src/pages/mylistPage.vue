<template>
  <base-layout page-title="My lists" page-default-back-link="/">
    <template v-slot:actions-end>
      <ion-button router-link="/mylist/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <ion-item class="my-space">Please select a word:
      <tag-list :tags="tags"></tag-list>
    </ion-item>
    <ion-item class="my-space">My lists
      <items-list :items="items"></items-list>
    </ion-item>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon, IonItem } from "@ionic/vue";
import { add } from "ionicons/icons";
import TagList from "@/components/tags/tagList.vue"
import ItemsList from "@/components/items/ItemsList.vue";

export default {
  components: {
    IonButton,
    IonIcon,
    IonItem,
    TagList,
    ItemsList
  },
  data() {
    return {
      add
    };
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    tags() {
      return this.$store.getters.tags;
    },
  },
};
</script>

<style scoped>
.my-space {
  margin-top: 2em;
  margin-bottom: 2em;
}

</style>
