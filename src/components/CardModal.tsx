import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearCart, removeFromCart, updateQuantity } from "../store/cartSlice";

interface Props {
	onClose: () => void;
}

const CartModal: React.FC<Props> = ({ onClose }) => {
	const cart = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				right: 0,
				background: "#fff",
				padding: 20,
			}}
		>
			<h2>Koszyk</h2>
			<button onClick={onClose}>Zamknij</button>
			{cart.map((item) => (
				<div key={item.id}>
					<h4>{item.name}</h4>
					<input
						type="number"
						value={item.quantity}
						min={1}
						onChange={(e) =>
							dispatch(
								updateQuantity({
									id: item.id,
									quantity: Number(e.target.value),
								})
							)
						}
					/>
					<button onClick={() => dispatch(removeFromCart(item.id))}>
						Usuń
					</button>
				</div>
			))}
			<p>Łącznie: {total} zł</p>
			<button onClick={() => dispatch(clearCart())}>Kupuję</button>
		</div>
	);
};

export default CartModal;
