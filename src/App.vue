<script setup lang="ts">
import { foodsApi } from "./apis/foods.api";
import { ingredientsApi } from "./apis/ingredients.api";
import App from "./components/App.vue";
const foods = foodsApi();
const ingredientsQuery = ingredientsApi();
</script>

<template>
    <div class="flex justify-center items-center p-4">
        <template
            v-if="foods.isLoading.value || ingredientsQuery.isLoading.value"
        >
            <span>Cargando....</span>
        </template>
        <template
            v-if="foods.isSuccess.value || ingredientsQuery.isSuccess.value"
        >
            <App
                :foods="foods.data.value!"
                :ingredients="ingredientsQuery.data.value!"
            />
        </template>
    </div>
</template>
