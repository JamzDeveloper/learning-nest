import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from "uuid";
export const CARS_SEED:Car[]=[
    {
        id:uuid(),
        brand:"Toyota",
        model:"cef4f"
    },
    {
        id:uuid(),
        brand:"Nissan",
        model:"ceffef4f"
    },
    {
        id:uuid(),
        brand:"Honda",
        model:"32fe"
    }

]