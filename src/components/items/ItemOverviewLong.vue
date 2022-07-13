<template>
  <ion-card>
    <ion-card-content>
      <ion-item>
        <ion-label>Item:</ion-label>
        <ion-label>{{ itemInfo.iteminfo.itemType }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Pet:</ion-label>
        <ion-label>{{ itemInfo.iteminfo.pets }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Smoke:</ion-label>
        <ion-label>{{ itemInfo.iteminfo.smoke }}</ion-label>
      </ion-item>
    </ion-card-content>
 </ion-card>
  <ion-img :src="itemDetail.imgurl" :alt="itemDetail.itemType"></ion-img>
  <h2 class="ion-text-center">{{ itemDetail.itemType }}</h2>
  <!--<p class="ion-text-center">{{ itemDetail.iteminfo }}</p> -->
  <ion-card>
    <ion-card-content>
      <ion-item>
        <ion-label>Person:</ion-label>
        <ion-label>{{ itemInfo.itemlocation.person }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Cell:</ion-label>
        <ion-label>{{ itemInfo.itemlocation.telephone }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Date:</ion-label>
        <ion-label>{{ itemInfo.itemlocation.date }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Time:</ion-label>
        <ion-label>{{ itemInfo.itemlocation.slottime }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Location:</ion-label>
        <ion-label>{{ itemInfo.itemlocation.latitude }}</ion-label>
        <ion-label>{{ itemInfo.itemlocation.longitude }}</ion-label>
      </ion-item>
    </ion-card-content>
 </ion-card>
</template>

<script>
import { IonCard, IonCardContent, IonLabel, IonItem, IonImg} from "@ionic/vue";

export default {
  props: ['itemDetail', 'itemInfo'],
  components: {
    IonCard,
    IonCardContent,
    IonLabel,
    IonItem,
    IonImg
  }
}
</script>
