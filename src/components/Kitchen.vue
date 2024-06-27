<script setup lang="ts">
import { FoodsApi } from "../apis/foods.api";
import { IngredientsApi } from "../apis/ingredients.api";

const props = defineProps<{ food: FoodsApi; ingredients: IngredientsApi[] }>();
const ingredients = props.food.ingredients.map(
    (ing) => props.ingredients.find((ingr) => Number(ingr.id) === ing)?.name
);
</script>

<template>
    <div class="w-full">
        <h1 class="text-4xl font-bold text-center">
            Felicidades se ha cocinado {{ props.food.name }}
        </h1>
        <img
            class="w-full h-[150px] object-cover"
            :src="props.food.image"
            width="100"
            height="100"
        />
        <div>
            <h3 class="mx-auto font-bold text-center text-xl">Ingredientes</h3>
            <div
                class="flex flex-col items-center h-[350px] overflow-auto w-full gap-1"
            >
                <button
                    v-for="ingredient of ingredients!"
                    type="button"
                    class="py-2 w-full"
                    aria-label="on choose ingredient"
                >
                    <p>{{ ingredient }}</p>
                </button>
            </div>
        </div>
    </div>
</template>
