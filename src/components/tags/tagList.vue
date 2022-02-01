<template>
  <ion-list v-for="tag in tags" :key='tag'>
    <ion-button @click="displayOptions(tag)">
      {{ tag }}
    </ion-button>
  </ion-list>
</template>

<script>
import { IonList, IonButton } from "@ionic/vue";

export default {
  props: ["tags"],
  components: {
    IonList,
    IonButton,
  },
  methods: {
    displayOptions(dopt) {
      console.log(dopt)
      this.$router.push('/selectitems')
    }
  }
};
</script>
