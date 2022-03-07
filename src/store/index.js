// import Vue from 'vue'
import { createStore } from 'vuex';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import Parse from 'parse'

const store = createStore({
  state() {
    return {
      loginStatus: '',
      authData:
      {
        token: "",
        refreshToken: "",
        tokenExp: "",
        peerId: 0,
        peerName: "AJ",
      },
      currentItem: '',
      currentPickup: 'ppl1',
      groupItemInfo: {
      },
      pairPickupItems: {
      },
      pickups: [],
      items: [],
      localStoreItems: [],
      networkItems: [],
      itemInfo: [],
      itemLocation: [],
      mylistTags: ['bed', 'chair', 'desk'],
      beds:
      [
        { title: 'double',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg/330px-Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg'
        },
        { title: 'single',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg/330px-Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg'
        },
        { title: 'bunk',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg/330px-Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg'
        },
      ]
    };
  },
  mutations: {
    SET_AUTH_PEER(state, update) {
      state.authData.peerName = update
      state.authData.peerId = 1
    },
    SET_saveAuthToken(state, update) {
      state.authData.token = update
      state.authData.peerId = 1
    },
    SET_endAuthToken(state) {
      state.authData.token = ''
      state.authData.peerId = 0
    },
    SET_saveLoginStatus(state, update) {
      state.loginStatus = update
    },
    SET_addPickup(state, update) {
      const newPickup = {
        id: new Date().toISOString(),
        title: update.title,
        image: update.imageSummary,
        location: update.location,
        description: update.description
      };
      state.currentPickup = newPickup.id
      state.pairPickupItems[state.currentPickup] = []
      state.pickups.push(newPickup);
    },
    SET_addItem(state, itemData) {
      let newItem = {}
      newItem.imgurl = itemData.imageURL
      newItem.id = itemData.id, // new Date().toISOString(),
      state.items.push(newItem);
      state.currentItem = newItem.id
      state.groupItemInfo[newItem.id] = []
    },
    SET_addItemInfo(state, itemData) {
      let newItemInfo = itemData
      newItemInfo.id = new Date().toISOString(),
      state.itemInfo.push(newItemInfo);
      state.groupItemInfo[state.currentItem].push(newItemInfo.id)
    },
    SET_addLocation(state, locationData) {
      const newLocation = locationData
      newLocation.id = new Date().toISOString(),
      state.itemLocation.push(newLocation);
      state.groupItemInfo[state.currentItem].push(newLocation.id)
      // save to the cloud
      let itemGroup = state.groupItemInfo[state.currentItem]
      let matchList = {}
      matchList.item = state.items.find((memory) => memory.id === state.currentItem);
      matchList.iteminfo = state.itemInfo.find((memory) => memory.id === itemGroup[0]);
      matchList.itemlocation = state.itemLocation.find((memory) => memory.id === itemGroup[1]);
      let bundleJSON = JSON.stringify(matchList)
      // add item details to localstorage to track item photos and details
      let updateStorageIndex = state.localStoreItems.push(bundleJSON)
      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(updateStorageIndex),
      });
      // save ie upload to cloud
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("oLOAS9sx13Si3EM8tAZIebMBqVFyvhY7Q1tKuF2K", "J9a52hSWodE4QbDzxNeA33mOdUzimPdj7QUo3dJu");
      const saveImage = new Parse.Object("itemdetails");
      saveImage.set("giftdetails", bundleJSON);
      saveImage.set("peer", state.authData.peerName);
      // saveImage.set("imginfo", file);
      saveImage.save().then(function() {
        console.log('cloud storage success')
      }, function(error) {
        console.log(error)
      });

    },
    SET_storageItems(state, update) {
      state.localStoreItems = JSON.parse(update)
    }
  },
  actions: {
    async actionAuthStart(context, payload) {
      // need to call parse
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("oLOAS9sx13Si3EM8tAZIebMBqVFyvhY7Q1tKuF2K", "J9a52hSWodE4QbDzxNeA33mOdUzimPdj7QUo3dJu");
      // let install = new Parse.Installation();
      // console.log(install)
      /* async function register() {
        const user = new Parse.User();
        user.set('username', '');
        user.set('email', '');
        user.set('firstName', '');
        user.set('lastName', '');
        user.set('password', '');
        try {
            let userResult = await user.signUp();
            console.log('User signed up', userResult);
          } catch (error) {
            console.error('Error while signing up user', error);
          }
      }
      await register() */

      async function peerLogin() {
        try {
          // Pass the username and password to logIn function
          const peer = payload.peer.trim()
          const pw = payload.pw.trim()
          let user = await Parse.User.logIn(peer, pw);
          // Do stuff after successful login
          if (user.get('sessionToken')) {
            context.commit("SET_saveAuthToken", user.get('sessionToken'));
            context.commit("SET_saveLoginStatus", 'success');
            context.commit('SET_AUTH_PEER', user.get('username'));
          } else {
            context.commit("SET_saveLoginStatus", false);
          }
        } catch (error) {
          console.error('Error while logging in user', error);
        }
      }
      await peerLogin()

        // Reading your First Data Object from Back4App
      /* async function retrievePerson() {
        const query = new Parse.Query("User");

        try {
          const person = await query.find() // .get("mIBxGxiQum");
          // const name = person.get("wastelabel");
          // const age = person.get("name");
            console.log('results')
            console.log(person)
            return person;
        } catch (error) {
              console.log(error)
        }
      }

      let peerInfo = await retrievePerson()
      */
      // this.taglabels = peerInfo
      /*for (let tag of peerInfo) {
        console.log(tag.get('wastelabel'))
      }*/

      /*
      context.commit("SET_saveLoginStatus", true);
      const response = await fetch("http://localhost:3000/auth/login", payload);
          if (response.status == 200 || response.status == 201) {
            await Storage.set({
              key: "access_token",
              value: response.data.access_token,
            });
            await Storage.set({
              key: "refresh_token",
              value: response.data.refresh_token,
            });
            context.commit("saveAuthToken", response.data);
            context.commit("SET_saveLoginStatus", true);
          } else {
            context.commit("SET_saveLoginStatus", false);
          } */
      // context.commit('SET_AUTH_PEER', update);
    },
    loadStorageTokens(context) {
        const access_token = '123' // await await Storage.get({ key: "access_token" });
        const refresh_token = '123' // await await Storage.get({ key: "refresh_token" });
        if (access_token && refresh_token) {
          const tokenData = {
            access_token: access_token.value,
            refresh_token: refresh_token.value
          };
          context.commit('SET_saveAuthToken', tokenData);
        }
    },
    actionEndaccess(context) {
      // remove token access
      context.commit('SET_endAuthToken');
    },
    addItem(context, itemData) {
      context.commit('SET_addItem', itemData);
    },
    addItemInfo(context, itemData) {
      context.commit('SET_addItemInfo', itemData);
    },
    addLocation(context, itemData) {
      context.commit('SET_addLocation', itemData);
    },
    addPickup(context, update) {
    context.commit('SET_addPickup', update);
    },
    async actionLocalStorageItems(context) {
      console.log('get local store info')
      try{
        const photoList = await Storage.get({ key: 'gifts' });
        console.log('stored locally')
        let path = JSON.parse(photoList.value)
        let extraInfo = path
        const file = await Filesystem.readFile({
          path: extraInfo,
          directory: Directory.Data,
        });
        context.commit('SET_storageItems', file);
      } catch(err) {
        console.log('Ohhhh nooo!');
        console.log(err);
      }
      /*const photosInStorage = photoList.value ? JSON.parse(photoList.value) : [];
      for (const photo of photosInStorage) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      } */
    }
  },
  getters: {
    getLoginStatus(state){
      return state.loginStatus;
    },
    getAuthData(state){
      return state.authData;
    },
    pickups(state) {
      return state.pickups;
    },
    itemMatcher(state) {
      return (memoryId) => {
        return state.items.find((memory) => memory.id === memoryId);
      };
    },
    pickup(state) {
      return (memoryId) => {
        return state.pickups.find((memory) => memory.id === memoryId);
      };
    },
    matcherGroupItems (state) {
      return (memoryId) => {
        let itemGroup = state.groupItemInfo[memoryId]
        // loop over and match to items
        let matchList = {}
        matchList.iteminfo = state.itemInfo.find((memory) => memory.id === itemGroup[0]);
        matchList.itemlocation = state.itemLocation.find((memory) => memory.id === itemGroup[1]);
        return matchList
      };
    },
    matcherPickItems (state) {
      return (memoryId) => {
        let pickIDmatch = state.pairPickupItems[memoryId]
        // loop over and match to items
        let matchList = []
        for(let pid of pickIDmatch) {
          for (let item of state.items) {
            if (item.id === pid) {
              matchList.push(item)
            }
          }
        }
        return matchList
        // return state.pickups.find((memory) => memory.id === memoryId);
      };
    },
    items(state) {
      return state.items;
    },
    item(state) {
      return (memoryId) => {
        return state.items.find((memory) => memory.id === memoryId);
      };
    },
    tags(state) {
      return state.mylistTags
    },
    beds(state) {
      return state.beds
    }
  },
});

export default store;
