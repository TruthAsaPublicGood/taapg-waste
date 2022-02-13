<template>
  <ion-item :router-link="`/items/${itemdetail.id}`">
    <ion-thumbnail slot="start">
      <ion-img :src="itemdetail.image" :alt="itemdetail.title"></ion-img>
    </ion-thumbnail>
    <ion-label>
      {{ itemdetail.title }}
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonThumbnail, IonImg, IonLabel } from "@ionic/vue";

export default {
  props: ["itemdetail"],
  components: {
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
  },
};
</script>
