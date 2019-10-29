<template>
    <div id="app">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
html {
    height: 100%;
}
#app {
    font-family: "MicrosoftYaHei", arial, "Franklin Gothic Medium",
        "Arial Narrow", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /*  width: 100vw; */
    /* height: 100vh; */
    background-color: #ecf5ff;
    height: 100%;
}

body {
    margin: 0;
    height: 100%;
    background-color: #f7f7f7;
}
</style>
