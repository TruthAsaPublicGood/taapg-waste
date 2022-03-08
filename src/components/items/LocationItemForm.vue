<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input type="text" required v-model="person" />
      </ion-item>
      <ion-item>
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Telephone</ion-label>
        <ion-input type="text" required v-model="telephone" />
      </ion-item>
      <ion-item>
        <ion-label>Date</ion-label>
        <!-- Selecting time, no date -->
        <ion-datetime presentation="time"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Day</ion-label>
        <ion-select interface="popover" value="" v-model="date">
          <ion-select-option value="monday">Monday</ion-select-option>
          <ion-select-option value="tuesday">Tuesday</ion-select-option>
          <ion-select-option value="wednesday">Wednesday</ion-select-option>
          <ion-select-option value="thursday">Thursday</ion-select-option>
          <ion-select-option value="friday">Friday</ion-select-option>
          <ion-select-option value="saturday">Saturday</ion-select-option>
          <ion-select-option value="sunday">Sunday</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Time slots</ion-label>
        <ion-select interface="popover"  value="" v-model="slottime">
          <ion-select-option value="8-10">8am-10am</ion-select-option>
          <ion-select-option value="10-12">10am-12noon</ion-select-option>
          <ion-select-option value="12-14">12noon-2pm</ion-select-option>
          <ion-select-option value="14-16">2pm-4pm</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Please add any additional information:</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription">
          dd {{ customDatetime }}
        </ion-textarea>
      </ion-item>
      <ion-item>
        <ion-thumbnail slot="start">
        </ion-thumbnail>
        <ion-button type="button" fill="clear" @click="takeGPS">
          Take GPS
        </ion-button>
        <ion-item id="gps-location">
          {{ latitude }} {{ longitude }}
        </ion-item>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Save location</ion-button>
  </form>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonThumbnail,
  IonDatetime
} from "@ionic/vue";
import { paw } from "ionicons/icons";
import { Geolocation } from '@capacitor/geolocation';
// import { format, parseISO } from 'date-fns';
import { ref } from 'vue';

export default {
  emits: ["save-location"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    IonThumbnail,
    IonDatetime
  },
  data() {
    return {
      paw,
      person: "",
      telephone: "",
      date: "",
      slottime: "",
      enteredDescription: "",
      takenGPS: '',
      latitude: '',
      longitude: '',
      customDatetime: ref()
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
      this.latitude = gpsLive.coords.latitude;
      this.longitude = gpsLive.coords.longitude;
    },
    /* confirm() {
      if (this.customDatetime.value === undefined) return;
      this.customDatetime.value.$el.confirm();
    },
    reset() {
      if (this.customDatetime.value === undefined) return;
      this.customDatetime.value.$el.reset();
    },
    formatDate(value) {
      return format(parseISO(value), 'MMM dd yyyy');
    }, */
    submitForm() {
      const locationData = {
        person: this.person,
        telephone: this.telephone,
        date: this.date,
        slottime: this.slottime,
        description: this.enteredDescription,
        latitude: this.latitude,
        longitude: this.longitude
      };
      this.$emit("save-location", locationData);
    },
  },
};
</script>
