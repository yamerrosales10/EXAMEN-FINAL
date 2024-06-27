import { useQuery } from "@vigilio/vue-fetching";
import { BASE_URL } from "../config";

export function ingredientsApi() {
    return useQuery<IngredientsApi[], unknown>("/ingredients", async (url) => {
        const response = await fetch(`${BASE_URL}${url}`);
        const result = await response.json();
        if (!response.ok) throw result;
        return result;
    });
}
export interface IngredientsApi {
    id: number;
    name: string;
}
