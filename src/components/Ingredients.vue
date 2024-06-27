<script setup lang="ts">
import { IngredientsApi } from "../apis/ingredients.api";

import { ref } from "vue";
import { sweetAlert } from "@vigilio/sweet";
const ingredientsQuery = defineProps<{ ingredients: IngredientsApi[] }>();
const ingredientsChoose = ref<number[]>([]);

const emits = defineEmits<{ (e: "choose-food", value: number[]): void }>();

function onChoose(ingredient: number) {
    if (existIngredient(ingredient)) {
        ingredientsChoose.value = ingredientsChoose.value.filter(
            (ing) => ing !== ingredient
        );
        return;
    }
    ingredientsChoose.value = [...ingredientsChoose.value, ingredient];
}

function existIngredient(ing: number) {
    return ingredientsChoose.value.some((ingredients) => ingredients === ing);
}
</script>

<template>
    <div class="flex flex-col gap-2 justify-center items-center md:w-[350px]">
        <h3 class="text-2xl font-bold">INGREDIENTES</h3>
        <div
            class="flex flex-col items-center h-[350px] overflow-auto w-full gap-1"
        >
            <template v-if="ingredientsQuery.ingredients">
                <button
                    type="button"
                    :class="
                        existIngredient(ingredient.id)
                            ? 'bg-black bg-opacity-90 text-white'
                            : ''
                    "
                    class="py-2 w-full"
                    @click="() => onChoose(ingredient.id)"
                    aria-label="on choose ingredient"
                    v-for="ingredient of ingredients"
                >
                    <p>{{ ingredient.name }}</p>
                </button>
            </template>
        </div>
        <button
            type="button"
            class="bg-orange-500 text-white px-4 py-2 w-full flex justify-center items-center gap-2"
            aria-label="cocine"
            @click="
                () => {
                    if (!ingredientsChoose.length) {
                        sweetAlert({
                            title: 'Escoge al menos un ingrediente',
                            icon: 'warning',
                        });
                        return;
                    }
                    emits('choose-food', ingredientsChoose);
                }
            "
        >
            <i class="fa-solid fa-utensils"></i> Cocinar
        </button>
    </div>
</template>
