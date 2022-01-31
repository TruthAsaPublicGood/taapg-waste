// import Vue from 'vue'
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
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
    };
  },
  mutations: {
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
    addItem(context, itemData) {
      context.commit('SET_addItem', itemData);
    },
    addPickup(context, update) {
    context.commit('SET_addPickup', update);
    }
  },
  getters: {
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
  },
});

export default store;
