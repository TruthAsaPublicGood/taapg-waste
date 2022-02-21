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
      // need to call parse
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("","");
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
          let user = await Parse.User.logIn(payload.peer, payload.pw);
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
