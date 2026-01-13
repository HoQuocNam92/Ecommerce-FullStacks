import router from "./router/router";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ProductProvider } from "./contexts/Product/ProductProvider";
import { CategoryProvider } from "./contexts/Category/CategoryProvider";
import { CartProvider } from "./contexts/Cart/CartProvider";
import { UserProvider } from "./contexts/User/UserProvider";
import { Toaster } from "sonner";
import { DndContext } from '@dnd-kit/core';

import Spiner from "./components/Spiner/Spiner";

function App() {


  return (
    <DndContext>

      <UserProvider>
        <CategoryProvider>
          <CartProvider>
            <ProductProvider>
              <Suspense fallback={<Spiner />}>
                <Toaster richColors position="top-right" />
                <RouterProvider router={router} />
              </Suspense>
            </ProductProvider>
          </CartProvider>
        </CategoryProvider>
      </UserProvider>
    </DndContext>
  );
}


export default App;
