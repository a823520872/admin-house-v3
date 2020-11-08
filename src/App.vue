<template>
    <div>
        <router-view></router-view>
        <v-loading></v-loading>
    </div>
</template>

<script>
import VLoading from './components/Loaing'
export default {
    name: 'App',
    components: {
        VLoading,
    }
}
</script>
