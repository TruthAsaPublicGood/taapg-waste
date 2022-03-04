<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label>Name</ion-label>
      </ion-item>
      <ion-item>paw
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Telephone</ion-label>
      </ion-item>
      <ion-item>Pickup times
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Time slots</ion-label>
        <ion-select value="">
          <ion-select-option value="yes">yes</ion-select-option>
          <ion-select-option value="no">no</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Please add any additional information:</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription"></ion-textarea>
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
  IonTextarea,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { paw } from "ionicons/icons";

export default {
  emits: ["save-item"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      paw,
      enteredTitle: "",
      enteredDescription: "",
    };
  },
  methods: {
    submitForm() {
      const itemData = {
        title: this.enteredTitle,
        imageUrl: this.takenImageUrl,
        description: this.enteredDescription,
      };
      this.$emit("save-item", itemData);
      this.$router.replace('/member');
    },
  },
};
</script>
