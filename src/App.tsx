import { Portal } from "@radix-ui/react-portal";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FallingLines } from "react-loader-spinner";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ProductsContext from "./context/ProductsContext";
import { Toaster } from "./lib/myToast";

const CheckOut = lazy(() => import("./pages/CheckOut"));
const Access_denied = lazy(() => import("./pages/Access_denied"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Master = lazy(() => import("./layout/Master"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductInfoPage = lazy(() => import("./pages/ProductInfoPage"));
const RegesterPage = lazy(() => import("./pages/RegesterPage"));

const Loader = () => {
  return (
    <Portal className=" flex h-screen items-center justify-center ">
      <FallingLines color="rgb(20 184 166)" width="100" visible={true} />
    </Portal>
  );
};
const ErrorBoundaryFallback = () => {
  return <div>an error ecorge please try again later</div>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RegesterPage />,
  },
  {
    element: <ProductsContext />,
    children: [
      {
        element: <Master />,
        children: [
          {
            path: "homepage",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "products/:id/:theme_id",
        element: <ProductInfoPage />,
      },
      {
        path: "check-out",
        element: <CheckOut />,
      },
      {
        path: "access-denied",
        element: <Access_denied />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
