import { computed, Injectable, signal } from "@angular/core";
import { CartItems } from "./cart.model";

@Injectable({
    providedIn: "root"
})


export class CartStore {

    private readonly _items = signal<CartItems[]>([]);

    readonly items = this._items.asReadonly();

    readonly totalItems = computed(() => this._items().reduce((total, item) => total + item.qty, 0));


    increase(id: string) {
        this._items.update(items => {
            const index = items.findIndex(item => item._id === id);
            if (index >= 0) {
                const updateItems = [...items];
                updateItems[index] = {
                    ...updateItems[index],
                    qty: updateItems[index].qty + 1
                }
                return updateItems
            }
            return [...items, { _id: id, qty: 1 }]
        })

    }

    decrease(id: string) {
        this._items.update((items) => {
            return items.map(item => item._id == id ? ({ ...item, qty: item.qty - 1 }) : item)
        })
    }

    deleteItem(id: string) {
        this._items.update(items => items.filter((item => item._id !== id)))
    }

    clear() {
        this._items.set([])
    }
}