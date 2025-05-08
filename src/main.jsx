import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
const HomeScreen = lazy(() => import("./screens/HomeScreen.jsx"));
const ProductScreen = lazy(() => import("./screens/ProductScreen.jsx"));
const CartScreen = lazy(() => import("./screens/CartScreen.jsx"));
const LoginScreen = lazy(() => import("./screens/LoginScreen.jsx"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen.jsx"));
const ShippingScreen = lazy(() => import("./screens/ShippingScreen.jsx"));
const PaymentScreen = lazy(() => import("./screens/PaymentScreen.jsx"));
const PlaceOrderScreen = lazy(() => import("./screens/PlaceOrderScreen.jsx"));
const OrderScreen = lazy(() => import("./screens/OrderScreen.jsx"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen.jsx"));
const OrderListScreen = lazy(() =>
  import("./screens/admin/OrderListScreen.jsx")
);
const ProductListScreen = lazy(() =>
  import("./screens/admin/ProductListScreen.jsx")
);
const ProductEditScreen = lazy(() =>
  import("./screens/admin/ProductEditScreen.jsx")
);
const UserListScreen = lazy(() => import("./screens/admin/UserListScreen.jsx"));
const UserEditScreen = lazy(() => import("./screens/admin/UserEditScreen.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route
          index={true}
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/search/:keyword"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/page/:pageNumber"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<div>Loading product details...</div>}>
              <ProductScreen />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading cart...</div>}>
              <CartScreen />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading login...</div>}>
              <LoginScreen />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Loading registration...</div>}>
              <RegisterScreen />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* Private Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route
            path="/shipping"
            element={
              <Suspense fallback={<div>Loading shipping...</div>}>
                <ShippingScreen />
              </Suspense>
            }
          />
          <Route
            path="/payment"
            element={
              <Suspense fallback={<div>Loading payment...</div>}>
                <PaymentScreen />
              </Suspense>
            }
          />
          <Route
            path="/placeorder"
            element={
              <Suspense fallback={<div>Loading order review...</div>}>
                <PlaceOrderScreen />
              </Suspense>
            }
          />
          <Route
            path="/order/:id"
            element={
              <Suspense fallback={<div>Loading order details...</div>}>
                <OrderScreen />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<div>Loading profile...</div>}>
                <ProfileScreen />
              </Suspense>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route path="" element={<AdminRoute />}>
          <Route
            path="/admin/orderlist"
            element={
              <Suspense fallback={<div>Loading orders...</div>}>
                <OrderListScreen />
              </Suspense>
            }
          />
          <Route
            path="/admin/productlist"
            element={
              <Suspense fallback={<div>Loading products...</div>}>
                <ProductListScreen />
              </Suspense>
            }
          />
          <Route
            path="/admin/productlist/:pageNumber"
            element={
              <Suspense fallback={<div>Loading products...</div>}>
                <ProductListScreen />
              </Suspense>
            }
          />
          <Route
            path="/admin/product/:id/edit"
            element={
              <Suspense fallback={<div>Loading product editor...</div>}>
                <ProductEditScreen />
              </Suspense>
            }
          />
          <Route
            path="/admin/userlist"
            element={
              <Suspense fallback={<div>Loading users...</div>}>
                <UserListScreen />
              </Suspense>
            }
          />
          <Route
            path="/admin/user/:id/edit"
            element={
              <Suspense fallback={<div>Loading user editor...</div>}>
                <UserEditScreen />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </>
  )
);

const root = createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);