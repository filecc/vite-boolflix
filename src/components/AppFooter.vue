<template>
    <footer class="p-4">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <img src="/images/logo.svg" alt="logo">
            </div>
            <div class="text-end">
                <small>coded with 💚 by <a class="text-dark" href="https://www.instagram.com/filecc">filecc</a></small>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

footer{
    background: linear-gradient(to right, black, $fg-primary);
}
img{
    width: 100px;
}

</style>