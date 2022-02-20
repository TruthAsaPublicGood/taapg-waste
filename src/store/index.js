// import Vue from 'vue'
import { createStore } from 'vuex';
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
      currentPickup: 'ppl1',
      pairPickupItems: {
        'ppl1': ['m1', 'm2']
      },
      pickups: [
        {
          id: 'ppl1',
          location: 'zip',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Plastic_Tuinstoel.jpg/300px-Plastic_Tuinstoel.jpg',
          title: 'Pickup first',
          description: 'home clearence',
        },
      ],
      items: [
        {
          id: 'm1',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Plastic_Tuinstoel.jpg/300px-Plastic_Tuinstoel.jpg',
          title: 'Chair',
          description: 'Good condiction desk chair',
        },
        {
          id: 'm2',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg/330px-Tutankhamun%27s_bed_%28Cairo_Museum%29.jpg',
          title: 'Bed',
          description: 'Reasonable condition wooden frame',
        },
        {
          id: 'm3',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Indian_-_Food.jpg/640px-Indian_-_Food.jpg',
          title: 'Kitchen Table',
          description: 'Medium size food table',
        },
      ],
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
      console.log('auth peer if valid pw')
      console.log(update)
      state.authData.peerName = update.name
      state.authData.peerId = 1
    },
    SET_saveAuthToken(state, update) {
      console.log('token set')
      console.log(update)
      state.authData.token = update.access_token
      state.authData.peerId = 1
    },
    SET_endAuthToken(state) {
      console.log('end token')
      state.authData.token = ''
      state.authData.peerId = 0
      console.log(state.authData)
    },
    SET_saveLoginStatus(state, update) {
      console.log('setlogin status')
      console.log(update)
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
      const newItem = {
        id: new Date().toISOString(),
        title: itemData.title,
        image: itemData.imageUrl,
        description: itemData.description
      };
      state.items.push(newItem);
      state.pairPickupItems[state.currentPickup].push(newItem.id)
    }
  },
  actions: {
    async actionAuthStart(context, payload) {
      console.log('action start ATH')
      console.log(payload)
      // need to call parse
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("","");
      let install = new Parse.Installation();
      console.log(install)
        // Reading your First Data Object from Back4App
      async function retrievePerson() {
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
      // this.taglabels = peerInfo
      /*for (let tag of peerInfo) {
        console.log(tag.get('wastelabel'))
      }*/
      if (peerInfo) {
        console.log('backe user check pass')
        context.commit("SET_saveAuthToken", '123');
        context.commit("SET_saveLoginStatus", 'success');
      } else {
        context.commit("SET_saveLoginStatus", false);
      }
      context.commit('SET_AUTH_PEER', peerInfo);
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
      console.log('signout start')
      // remove token access
      context.commit('SET_endAuthToken');
    },
    addItem(context, itemData) {
      context.commit('SET_addItem', itemData);
    },
    addPickup(context, update) {
    context.commit('SET_addPickup', update);
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
    pickup(state) {
      return (memoryId) => {
        return state.pickups.find((memory) => memory.id === memoryId);
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
