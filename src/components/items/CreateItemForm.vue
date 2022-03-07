<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label>choose item type</ion-label>
        <ion-select interface="popover" value="" v-model="itemType">
          <ion-select-option value="twinmat">Twin mattress</ion-select-option>
          <ion-select-option value="qmat">Queen mattress</ion-select-option>
          <ion-select-option value="bedframe">Bed frame</ion-select-option>
          <ion-select-option value="table">Table</ion-select-option>
          <ion-select-option value="chairs">Chairs</ion-select-option>
          <ion-select-option value="couch">Couch</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>paw
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Coming from home with pets?</ion-label>
        <ion-select interface="popover" value="" v-model="pets">
          <ion-select-option value="yes">yes</ion-select-option>
          <ion-select-option value="no">no</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>smoker
        <ion-icon slot="icon-only" :icon="paw"></ion-icon>
        <ion-label>Smoking home?</ion-label>
        <ion-select interface="popover" value="" v-model="smoker">
          <ion-select-option value="yes">yes</ion-select-option>
          <ion-select-option value="no">no</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Please add any additional information on condition:</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription"></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Next location</ion-button>
  </form>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
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
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      paw,
      itemType: "",
      pets: false,
      smoker: false,
      enteredDescription: "",
    };
  },
  methods: {
    submitForm() {
      const itemData = {
        itemType: this.itemType,
        pets: this.pets,
        smoke: this.smoker,
        itemInfo: this.enteredDescription,
      };
      this.$emit("save-item", itemData);
    },
  },
};
</script>
