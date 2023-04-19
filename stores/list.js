import { defineStore } from 'pinia';

export const useHomeList = defineStore('home-list', {
    state: () => ({ list: null, loading: false}),
    actions: {
        populate(item) {
          this.list = item;
        },
        loadingFalse() {
            this.loading = false;
        },
        loadingTrue(){
            this.loading = true;
        }
    }
})

