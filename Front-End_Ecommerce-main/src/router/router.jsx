


import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import RequireAuth from "@/components/Auth/RequireAuth";
import RequireAccount from "@/components/Auth/RequireAccount";
import RequireOrderSuccess from "@/components/Auth/RequireOrderSuccess";

const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/components/Error/NotFound"));

const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ForgotPassword = lazy(() => import("@/components/ResetPassword/FromResetPassword"));
const ResetPassword = lazy(() => import("@/components/ResetPassword/ResetPassword"));
const ForgotPasswordSuccess = lazy(() => import("@/components/ResetPassword/SentMail"));

const Cart = lazy(() => import("@/pages/Cart"));
const Wishlist = lazy(() => import("@/pages/WishList"));
const Checkout = lazy(() => import("@/pages/CheckOut"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
const Orders = lazy(() => import("@/pages/Orders"));
const OrderDetails = lazy(() => import("@/pages/OrderDetails"));

const ProfileLayout = lazy(() => import("@/pages/Profile"));
const MainProfile = lazy(() => import("@/components/Profile/MainProfile"));
const AddressManagement = lazy(() => import("@/components/Profile/AddressManagement"));
const AddAddressPage = lazy(() => import("@/components/Address/AddAddressPage"));
const PaymentTab = lazy(() => import("@/components/Profile/PaymentTab"));
const WishlistTab = lazy(() => import("@/components/Profile/WishlistTab"));
const SettingsTab = lazy(() => import("@/components/Profile/SettingsTab"));
const CancellationsTab = lazy(() => import("@/components/Profile/CancellationsTab"));
const Counpon = lazy(() => import("@/components/Dashboard/Sales/Coupons/CouponPage"));
const Gift = lazy(() => import("@/components/Dashboard/Sales/Gift/GiftPage"));
const Promotion = lazy(() => import("@/components/Dashboard/Sales/Promotions/PromotionPage"));

const Dashboard = lazy(() => import("@/components/Dashboard/Dashboard"));
const {
  Employee,
  Customer,
  Categories,
  Products: AdminProducts,
  Roles,
  Orders: AdminOrders,
  Settings,
  ReviewsTable,
  RevenueReport,
} = await import("@/components/Dashboard");

const FormProducts = lazy(() => import("@/components/Dashboard/Products/Form/FormProducts"));
const ProductImages = lazy(() => import("@/components/Dashboard/Products/ImageManager"));
const SaleManagement = lazy(() => import("@/components/Dashboard/SaleManagement/SaleManagement"));
const BestSelling = lazy(() => import("@/components/Dashboard/BestSelling/BestSelling"));
const FormOrderDetails = lazy(() => import("@/components/Dashboard/Orders/Form/FormOrderDetails"));
const Banner = lazy(() => import("@/components/Dashboard/Banners/Banner"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products/:slug?/:id?", element: <Products /> },
      { path: "product/:slug", element: <ProductDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },

      {
        path: "auth",
        element: <RequireAccount />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "forgot-password/success", element: <ForgotPasswordSuccess /> },
          { path: "reset-password/:token", element: <ResetPassword /> },
        ],
      },

      {
        element: <RequireAuth />,
        children: [
          { path: "cart", element: <Cart /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "checkout", element: <Checkout /> },
          {
            path: "order-success", element: <RequireOrderSuccess>
              <OrderSuccess />
            </RequireOrderSuccess>
          },
          { path: "orders", element: <Orders /> },
          { path: "order/:order_id", element: <OrderDetails /> },

          {
            path: "account",
            element: <ProfileLayout />,
            children: [
              { index: true, element: <MainProfile /> },
              { path: "address", element: <AddressManagement /> },
              { path: "address/add", element: <AddAddressPage /> },
              { path: "payment", element: <PaymentTab /> },
              { path: "wishlist", element: <WishlistTab /> },
              { path: "settings", element: <SettingsTab /> },
              { path: "cancellations", element: <CancellationsTab /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "overview", element: <Dashboard /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "order/:order_id", element: <FormOrderDetails /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/create", element: <FormProducts /> },
      { path: "products/edit/:slug", element: <FormProducts /> },
      { path: "products/images", element: <ProductImages /> },
      { path: "products/sale", element: <SaleManagement /> },
      { path: "products/best-selling", element: <BestSelling /> },
      { path: "categories", element: <Categories /> },
      { path: "customers", element: <Customer /> },
      { path: "employees", element: <Employee /> },
      { path: "reviews", element: <ReviewsTable /> },
      { path: "banners", element: <Banner /> },
      { path: "discount-code", element: <Counpon /> },
      { path: "discount-promotions", element: <Promotion /> },
      { path: "buy-get-promotions", element: < Gift /> },
      { path: "roles", element: <Roles /> },
      { path: "settings", element: <Settings /> },
      { path: "revenue", element: <RevenueReport /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
