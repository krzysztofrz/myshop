import React, { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartModal from "./components/CardModal";

const App: React.FC = () => {
	const [showCart, setShowCart] = useState(false);

	return (
		<div>
			<Header onCartClick={() => setShowCart(true)} />
			<ProductList />
			{showCart && <CartModal onClose={() => setShowCart(false)} />}
		</div>
	);
};

export default App;
