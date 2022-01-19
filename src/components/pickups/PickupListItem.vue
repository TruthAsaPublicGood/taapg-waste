<template>
  <ion-item :router-link="`/items/${pickupdetail.id}`">
    <ion-thumbnail slot="start">
      <ion-img :src="pickupdetail.image" :alt="pickupdetail.title"></ion-img>
    </ion-thumbnail>
    <ion-label>
      {{ pickupdetail.title }}
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonThumbnail, IonImg, IonLabel } from "@ionic/vue";

export default {
  props: ["pickupdetail"],
  components: {
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
  },
};
</script>
