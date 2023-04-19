import { defineStore } from 'pinia';

export const useHomeList = defineStore('home-list', {
    state: () => ({ 
        list: null, 
        loading: false,
        URL_IMG: 'https://image.tmdb.org/t/p/original',
    }),
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

