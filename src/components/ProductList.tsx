import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";

const PRODUCTS_PER_PAGE = 8;

const ProductList: React.FC = () => {
	const products = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
	const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const currentProducts = products.slice(
		startIndex,
		startIndex + PRODUCTS_PER_PAGE
	);

	return (
		<div>
			<div className="product-list">
				{currentProducts.map((product: Product) => (
					<div key={product.id} className="product-card">
						<img src={product.image} alt={product.name} />
						<h3>{product.name}</h3>
						<p>{product.price} zł</p>
						<button
							onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
						>
							Dodaj do koszyka
						</button>
					</div>
				))}
			</div>

			<div className="pagination">
				<button
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
				>
					◀
				</button>

				{[...Array(totalPages)].map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrentPage(i + 1)}
						className={currentPage === i + 1 ? "active" : ""}
					>
						{i + 1}
					</button>
				))}

				<button
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					▶
				</button>
			</div>
		</div>
	);
};

export default ProductList;
