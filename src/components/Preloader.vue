<template>
    <div class="preloader">
        <div class="d-flex flex-column justify-center align-center fill-height overflow-hidden">
            <p class="display-2">NorteApp</p>
            <img class="compass" src="@/assets/compass.svg"/>
            <br>
            <p>ingresando...</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Preloader",
    }
</script>

<style scoped lang="scss">
    .preloader{
        height: 100vh;
        width: 100vw;
        z-index: 1000;
        position: absolute;
        background-color: white;
        div{
            align-self: center;
        }
        img{
            width: 70px;
        }
    }
    .compass{
        animation: rotate .8s infinite;
    }
    @keyframes rotate {
        50% { transform: rotate(-90deg); }
        100% { transform: rotate(0deg); }
    }
</style>
