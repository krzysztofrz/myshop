import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

export interface CartItem extends Product {
	quantity: number;
}

const cartSlice = createSlice({
	name: "cart",
	initialState: [] as CartItem[],
	reducers: {
		addToCart(
			state,
			action: PayloadAction<{ product: Product; quantity: number }>
		) {
			const item = state.find((p) => p.id === action.payload.product.id);
			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.push({
					...action.payload.product,
					quantity: action.payload.quantity,
				});
			}
		},
		removeFromCart(state, action: PayloadAction<number>) {
			return state.filter((item) => item.id !== action.payload);
		},
		updateQuantity(
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) {
			const item = state.find((p) => p.id === action.payload.id);
			if (item) item.quantity = action.payload.quantity;
		},
		clearCart() {
			return [];
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
