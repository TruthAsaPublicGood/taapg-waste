<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input type="text" required v-model="enteredTitle" />
      </ion-item>
      <ion-item>
        <ion-thumbnail slot="start">
        </ion-thumbnail>
        <ion-button type="button" fill="clear" @click="takeGPS">
          Take GPS
        </ion-button>
        <div id="gps-location" v-if="takenGPS.coords !== undefined">
          {{ takenGPS.coords.latitude }} {{ takenGPS.coords.longitude }}
        </div>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Tags</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription"></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Save</ion-button>
      {{ livePickupID }}
    <ion-button @click="addItems">Add items</ion-button>
  </form>
  <div id="check-items" v-if="pairItems !== undefined">
    <item-list-item
      v-for="pi in pairItems"
      :key="pi.id"
      :itemdetail="pi"
    ></item-list-item>
  </div>
</template>

<script>
import ItemListItem from "@/components/items/ItemListItem.vue";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonThumbnail
} from "@ionic/vue";
import { Geolocation } from '@capacitor/geolocation';

export default {
  emits: ["save-pickup"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonThumbnail,
    ItemListItem
  },
  computed: {
    livePickupID: function () {
      return this.$store.state.currentPickup
    },
    loadedItems() {
      return this.$store.getters.pickup(this.memoryId);
    },
    pairItems: function () {
      return this.$store.state.pairPickupItems[this.livePickupID]
    }
  },
  data() {
    return {
      enteredTitle: "",
      enteredDescription: "",
      imageSummary: null,
      takenGPS: ''
    };
  },
  methods: {
    async takeGPS() {
      const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
      };
      let gpsLive = await printCurrentPosition();
      this.takenGPS = gpsLive;
    },
    addItems() {
      this.$router.replace('/items/add/:id')
    },
    submitForm() {
      const itemData = {
        title: this.enteredTitle,
        image: this.imagesummary,
        location: this.takenGPS,
        description: this.enteredDescription,
      };
      // this.$emit("save-pickup", itemData);
      this.$store.dispatch('addPickup', itemData);
    },
  },
};
</script>
