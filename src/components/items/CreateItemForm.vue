<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input type="text" required v-model="enteredTitle" />
      </ion-item>
      <ion-item>
        <ion-thumbnail slot="start">
          <img :src="takenImageUrl" />
        </ion-thumbnail>
        <ion-button type="button" fill="clear" @click="takePhoto">
          <ion-icon slot="start" :icon="camera"></ion-icon>
          Take Photo
        </ion-button>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Description</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription"></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Save</ion-button>
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
  IonThumbnail,
  IonIcon
} from "@ionic/vue";
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import Parse from 'parse';

export default {
  emits: ["save-item"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonThumbnail,
    IonIcon
  },
  data() {
    return {
      enteredTitle: "",
      enteredDescription: "",
      takenImageUrl: null,
      camera
    };
  },
  methods: {
    async takePhoto() {
      const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri
        });
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        // var imageUrl = image.webPath;
        // Can be set to the src of an image now
        // this.takenImageUrl = imageUrl;
        return image;
      };
      let takenImage = await takePicture()
      var imageUrl = takenImage.webPath;
      // Can be set to the src of an image now
      this.takenImageUrl = imageUrl;
      console.log('photo taken')
      this.saveParseImage()
    },
    saveParseImage() {
      console.log('start of save')
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("oLOAS9sx13Si3EM8tAZIebMBqVFyvhY7Q1tKuF2K", "J9a52hSWodE4QbDzxNeA33mOdUzimPdj7QUo3dJu");
      let install = new Parse.Installation();
      console.log(install)
      const base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
      const file = new Parse.File("myfile1.txt", { base64: base64 });
      console.log('file saved?')
      console.log(file)
      file.save().then(function() {
        // The file has been saved to Parse.
        console.log('file saved')
      }, function(error) {
        // The file either could not be read, or could not be saved to Parse.
        console.log(error)
      });

      // save
      const saveImage = new Parse.Object("gifts");
      saveImage.set("giftpic", file);
      // saveImage.set("imginfo", file);
      saveImage.save().then(function(data) {
        console.log('saved objemct')
        console.log(data)
      }, function(error) {
        console.log(error)
      });

      /*
      const giftStore = Parse.Object.extend("gifts");
      const giftImage = new giftStore();

      giftImage.set();
      giftImage.set();

      giftImage.save()
      .then((giftImage) => {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + giftImage.id);
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
      */
    },
    submitForm() {
      const itemData = {
        title: this.enteredTitle,
        imageUrl: this.takenImageUrl,
        description: this.enteredDescription,
      };
      this.$emit("save-item", itemData);
    },
  },
};
</script>
