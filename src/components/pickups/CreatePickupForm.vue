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
        <ion-label position="floating">Description</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription"></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Save</ion-button>
      {{ livePickupID }}
    <ion-button @click="addItems">Add items</ion-button>
  </form>
</template>

<script>
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
// import { Plugins } from '@capacitor/core';

export default {
  emits: ["save-pickup"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonThumbnail
  },
  computed: {
    livePickupID: function () {
      return this.$store.state.currentPickup
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
      };
      this.takenGPS = printCurrentPosition;
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
