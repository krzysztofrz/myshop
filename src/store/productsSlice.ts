import { createSlice } from "@reduxjs/toolkit";

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	available: number;
}

const initialState: Product[] = Array.from({ length: 20 }, (_, i) => ({
	id: i + 1,
	name: `Produkt ${i + 1}`,
	price: Math.round(Math.random() * 100 + 10),
	image: `https://picsum.photos/200?random=${i + 1}`,
	description: `Opis produktu ${i + 1}`,
	available: 10 + i,
}));

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
});

export default productsSlice.reducer;
