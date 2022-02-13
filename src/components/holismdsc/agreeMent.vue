<template>
  <base-layout page-title="ID & H-DSC" page-default-back-link="/">
    <template v-slot:actions-end>
      <ion-button router-link="/mylist/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <ion-item class="holism-space">
      Register / JOIN
    </ion-item>
    <ion-item class="holism-space">
      CONSENT wizard
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
.holism-space {
  margin-top: 2em;
  margin-bottom: 2em;
}

</style>
