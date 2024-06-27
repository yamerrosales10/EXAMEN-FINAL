<script setup lang="ts">
import { ref } from "vue";
import Ingredients from "./Ingredients.vue";
import Kitchen from "./Kitchen.vue";
import Foods from "./Foods.vue";
import { FoodsApi } from "../apis/foods.api";
import { IngredientsApi } from "../apis/ingredients.api";
import { sweetAlert, sweetModal } from "@vigilio/sweet";
const props = defineProps<{
    foods: FoodsApi[];
    ingredients: IngredientsApi[];
}>();
const foods = ref(props.foods);
const findFood = ref<FoodsApi | null>(null);
    function chooseFood(ingredients: number[]) {
    const exactMatches: FoodsApi[] = [];
    const partialMatches: FoodsApi[] = [];

    foods.value.forEach((food) => {
        const matchedIngredients = food.ingredients.filter((ingredient) =>
            ingredients.includes(ingredient)
        );

        if (
            matchedIngredients.length === food.ingredients.length &&
            food.ingredients.length === ingredients.length
        ) {
            exactMatches.push(food);
        } else if (matchedIngredients.length > 0) {
            partialMatches.push(food);
        }
    });

    if (exactMatches.length > 0) {
        findFood.value = exactMatches[0];
        console.log("Encontrado: ", exactMatches);
    } else if (partialMatches.length > 0) {
        sweetModal({
            html: `<div>Parecidos, pero no encontrado ingredientes: ${JSON.stringify(
                partialMatches.map((a) => a.name),
                null,
                3
            )}</div>`,
        });
        findFood.value = null;
    } else {
        findFood.value = null;
        sweetAlert({icon:"danger","title":"no se cocinó"})
    }
}
</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="w-full flex gap-2">
            <template v-if="findFood">
                <Kitchen :food="findFood" :ingredients="props.ingredients" />
            </template>
            <template v-else>
                <div class="w-full">
                    <h1 class="text-4xl font-bold text-center">A cocinar!!</h1>
                </div>
            </template>
            <Ingredients
                @choose-food="chooseFood"
                :ingredients="props.ingredients"
            />
        </div>
        <Foods :foods="props.foods" :ingredients="props.ingredients" />
    </div>
</template>
