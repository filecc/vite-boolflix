<template>
    <div>
        {{ title }}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title: null,
                id: null
            }
        },
        methods: {

        },
        mounted(){
            const split = this.$route.params.name.split('-');
            this.title = split[1];
            this.id = split[0];
        }
        
    }
</script>

<style lang="scss" scoped>

</style>