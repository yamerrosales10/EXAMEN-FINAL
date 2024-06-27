<script setup lang="ts">
import { sweetModal } from "@vigilio/sweet";
import { FoodsApi } from "../apis/foods.api";
import { IngredientsApi } from "../apis/ingredients.api";
const props = defineProps<{
    foods: FoodsApi[];
    ingredients: IngredientsApi[];
}>();

function showIngredients(food: FoodsApi) {
    sweetModal({
        html: `<div>
        <h1 class="font-bold text-2xl">${food.name}</h1>
        <span>Ingredients</span>
        <div class="flex flex-wrap">${food.ingredients.map(
            (ing) => props.ingredients.find((ingr) => Number(ingr.id) === ing)?.name
        )}</div>
        </div>`,
        showCloseButton: true,
    });
}
</script>
<template>
    <div class="w-full flex gap-2 flex-wrap justify-center">
        <div
            class="w-[300px] flex justify-center flex-col"
            v-for="food in props.foods"
        >
            <img
                class="w-full h-[150px] object-cover"
                :src="food.image"
                width="100"
                height="100"
                :alt="food.name"
            />
            <span class="font-bold text-center">{{ food.name }}</span>
            <button
                class="bg-blue-600 text-white py-2"
                aria-label="show ingredient"
                type="button"
                @click="() => showIngredients(food)"
            >
                <i class="fa-solid fa-eye"></i> Ver ingredientes
            </button>
        </div>
    </div>
</template>
