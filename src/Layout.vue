<template>
    <div class="layout">
        <nav>
            <router-link :to="{ name : 'app' }">Home</router-link>
            <router-link :to="{ name : 'form' }">Form</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>