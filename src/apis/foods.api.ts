import { useQuery } from "@vigilio/vue-fetching";
import { BASE_URL } from "../config";

export function foodsApi() {
    return useQuery<FoodsApi[], unknown>("/foods", async (url) => {
        const response = await fetch(`${BASE_URL}${url}`);
        const result = await response.json();
        if (!response.ok) throw result;
        return result;
    });
}
export interface FoodsApi {
    id: string;
    name: string;
    image: string;
    ingredients: number[];
}
