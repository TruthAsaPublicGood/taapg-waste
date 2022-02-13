<template>
  <base-layout page-title="My lists" page-default-back-link="/">
    <template v-slot:actions-end>
      <ion-button router-link="/mylist/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <button @click="tagLabalCloud">tagCloud</button>
    <ion-item class="my-space">Please select a word:
      <tag-list :tags="taglabels"></tag-list>
    </ion-item>
    <ion-item class="my-space">My lists
      <items-list :items="items"></items-list>
    </ion-item>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon, IonItem } from "@ionic/vue";
import { add } from "ionicons/icons";
import Parse from 'parse';
import TagList from "@/components/tags/tagList.vue"
import ItemsList from "@/components/items/ItemsList.vue";

export default {
  components: {
    IonButton,
    IonIcon,
    IonItem,
    TagList,
    ItemsList
  },
  data() {
    return {
      add,
      taglabels: []
    };
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    tags() {
      return this.$store.getters.tags;
    },
  },
  methods: {
    async tagLabalCloud ()  {
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("oLOAS9sx13Si3EM8tAZIebMBqVFyvhY7Q1tKuF2K", "J9a52hSWodE4QbDzxNeA33mOdUzimPdj7QUo3dJu");
        let install = new Parse.Installation();
        console.log(install)
        // Reading your First Data Object from Back4App
      async function retrievePerson() {
        const query = new Parse.Query("waste");

        try {
          const person = await query.find() // .get("mIBxGxiQum");
          // const name = person.get("wastelabel");
          // const age = person.get("name");
              console.log('results')
                // console.log(person)
                return person;
        } catch (error) {
              console.log(error)
        }
      }

      let peerInfo = await retrievePerson()
      this.taglabels = peerInfo
      for (let tag of peerInfo) {
        console.log(tag.get('wastelabel'))
      }
    }
  }
};
</script>

<style scoped>
.my-space {
  margin-top: 2em;
  margin-bottom: 2em;
}

</style>
