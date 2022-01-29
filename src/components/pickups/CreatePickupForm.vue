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
    <item-list-item
      v-for="pi in pairItems"
      :key="pi.id"
      :itemdetail="pi"
    ></item-list-item>
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
      console.log('pair items')
      console.log(this.livePickupID)
      console.log(this.$store.state.pairPickupItems)
      console.log(this.$store.state.pairPickupItems[this.livePickupID])
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
      console.log('take gps start')
      const printCurrentPosition = async () => {
        console.log('watiings')
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates);
        this.takenGPS = coordinates;
      };
      await printCurrentPosition();
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
      this.$emit("save-pickup", itemData);
    },
  },
};
</script>
