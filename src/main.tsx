import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.tsx";
import { Layout } from "./layout/Layout/Layout.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense, lazy } from "react";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { get, ref } from "firebase/database";
import { db } from "./helpers/firebaseInit.ts";
import { Product } from "./interfaces/product.interface.ts";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Success } from "./pages/Success/Success.tsx";

const Menu = lazy(() => import("./pages/Menu/Menu"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Product = lazy(() => import("./pages/Product/Product"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<>Loading...</>}>
              <Menu />
            </Suspense>
          ),
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<>Loading...</>}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "/product/:id",
          element: <Product />,
          errorElement: <p style={{ color: "white" }}>Error</p>,
          loader: async ({ params }) => {
            const burgersRef = ref(db, "burgers");
            const snapshot = await get(burgersRef);

            const burgersArray: Product[] = snapshot.val();
            const data = burgersArray.find(
              (burger) => burger.id === Number(params.id)
            );

            return defer({
              data,
            });
          },
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);
