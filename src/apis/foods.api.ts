import { useQuery } from "@vigilio/vue-fetching";
import { BASE_URL } from "../config";

export function foodsApi() {
    return useQuery<FoodsApi[], unknown>("/foods", async (url) => {
        const response = await fetch(`${BASE_URL}${url}`);
        const result = await response.json();
        if (!response.ok) throw result;
        return result;
    } ,  {
        transformData(data) {
            const mapped = data.map((d) => ({ ...d, id: Number(d.id) }));

            return mapped;
        },
    });
}
export interface FoodsApi {
    id: number;
    name: string;
    image: string;
    ingredients: number[];
}
