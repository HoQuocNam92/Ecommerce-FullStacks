import { useContext } from "react";

import { CartContext } from "../contexts/Cart/CartContext";

export const useCart = () => useContext(CartContext);
