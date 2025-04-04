import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

import { LoadingProvider } from "./context/Loading.tsx";
import { configAxios } from "./config/aixos.ts";
import { CartProvider } from "./context/Cart.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { ModalAddCartProvider } from "./context/MoDalAddToCart.tsx";
import { ShipProvider } from "./context/Ship.tsx";
const queryClient = new QueryClient()
configAxios();
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <LoadingProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          {/* bọc vào đây */}
          <SearchProvider>
            <ModalAddCartProvider>
              <ShipProvider>
                <App />
              </ShipProvider>
            </ModalAddCartProvider>
          </SearchProvider>
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </LoadingProvider>,

  // </StrictMode>,

);
