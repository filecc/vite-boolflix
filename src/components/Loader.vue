<template>
    <div class="loading">

        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;
.loading {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    background-color: #202020;
    color: $fg-primary;
    display: grid;
    place-items: center;
}
</style>