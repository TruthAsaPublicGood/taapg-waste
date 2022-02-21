<template>
  <base-layout page-title="ID & H-DSC" page-default-back-link="/">
    <template v-slot:actions-end>
      <ion-button router-link="/mylist/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <ion-item class="aboutspace-space">
      Truth as a Public Good.  See our <a href="https://truthasapublicgood.github.io/">website</a>
    </ion-item>
    <ion-item class="aboutspace-space">
      Circular App
    </ion-item>
    <ion-item class="aboutspace-space">
      Commonwealth of cooperatives
    </ion-item>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon, IonItem } from "@ionic/vue";
import { add } from "ionicons/icons";

export default {
  components: {
    IonButton,
    IonIcon,
    IonItem,
  },
  data() {
    return {
      add
    };
  },
  computed: {
  },
};
</script>

<style scoped>
.aboutspace-space {
  margin-top: 2em;
  margin-bottom: 2em;
}

</style>
