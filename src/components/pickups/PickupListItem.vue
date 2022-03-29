<template>
  <ion-item :router-link="`/pickups/${pickupdetail.id}/type/${type}`">
    <ion-thumbnail slot="start">
      <ion-img :src="pickupdetail.imgurl" :alt="pickupdetail.id"></ion-img>
    </ion-thumbnail>
    <ion-label>
      {{ pickupdetail.id }}
    </ion-label>
    <ion-label>
      {{ pickupdetail.itemlocation.person }}
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonThumbnail, IonImg, IonLabel } from "@ionic/vue";

export default {
  props: ["pickupdetail", "type"],
  components: {
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
  }
};
</script>
