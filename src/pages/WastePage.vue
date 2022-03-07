<template>
  <base-layout page-title="TaaPG-Circular">
    <template v-slot:actions-end>
      <ion-button router-link="/">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <div id="peer-live">
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label>Peer Name:</ion-label>
            <ion-label>{{ getAuthData.peerName }}</ion-label>
          </ion-item>
        </ion-card-content>
     </ion-card>
    </div>
    <div class="collection-button">
      <ion-button @click="takePhoto">
        <ion-icon slot="icon-only" :icon="camera"></ion-icon>
        New item
      </ion-button>
    </div>
    <div class="collection-button">
      <ion-button @click="listPickups">History</ion-button>
    </div>
    <!-- <div>
      <button @click="tagLabalCloud">tagCloud</button>
      tags:
      <ul v-for="tag in taglabels" :key="tag.objectId">
        <li>
          <ion-button>{{ tag.get('wastelabel') }}</ion-button>
        </li>
      </ul>
    </div> -->
    <div class="signout-button">
      <ion-button color="dark" @click="authEnd" >Sign Out</ion-button>
    </div>
    <div class="footer-logo">
      <ion-img :src="logoW"></ion-img>
    </div>
  </base-layout>
</template>

<script>
import { IonCard, IonCardContent, IonLabel, IonItem, IonButton, IonIcon, IonImg} from "@ionic/vue";
import { add, camera } from "ionicons/icons";
import { mapGetters } from "vuex";
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import Parse from 'parse';

export default {
  components: {
    IonCard,
    IonCardContent,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonImg
  },
  data() {
    return {
      add,
      camera,
      logoW:  require('.././assets/taspg-circular.png')
    };
  },
  computed: {
    ...mapGetters(['getAuthData'])
  },
  methods: {
    authEnd() {
      this.$store.dispatch('actionEndaccess');
      this.$router.push('/')
    },
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
      this.saveParseImage()
    },
    async saveLocalImage() {
      // Write the file to the data directory
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: this.takenImageUrl,
        directory: Directory.Data
      });
      console.log(savedFile)
    },
    saveParseImage() {
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("oLOAS9sx13Si3EM8tAZIebMBqVFyvhY7Q1tKuF2K", "J9a52hSWodE4QbDzxNeA33mOdUzimPdj7QUo3dJu");
      const base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
      const file = new Parse.File("myfile1.txt", { base64: base64 });
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
      // setup new item id i.e. unique time for now
      this.$store.dispatch('addItem', this.takenImageUrl);
      // lastly with image saved add item details
      this.$router.push('/items/add/:id')
    },
    async getImageLocal() {
      let localImage = await this.readAsBase64('d')
      console.log(localImage)
    },
    async readAsBase64(photo) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob);
    },
    async convertBlobToBase64(blob) {
      let convertB64 = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
      return convertB64
    },
    listPickups() {
      this.$router.push('/pickups')
    },
    agreeTerms () {
      this.$router.push('/holismdsc')
    }
  },
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
}

.collection-button {
  display: flex;
  justify-content: center;
  padding-top: 2em;
}

.signout-button {
  display: flex;
  justify-content: center;
  padding-top: 6em;
}


.footer-logo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 0px solid red;
  height: 380px;
}

.logo-imaged {
  align-items: flex-end;
  align-self: flex-end;
}

</style>
