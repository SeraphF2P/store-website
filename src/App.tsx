import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./lib/myToast";
import "./App.css";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Master = lazy(() => import("./layout/Master"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductInfoPage = lazy(() => import("./pages/ProductInfoPage"));
const RegesterPage = lazy(() => import("./pages/RegesterPage"));

function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Toaster position="top-center" />
					<ErrorBoundary fallback={<div>an error ecorge please try again later</div>}>
						<Suspense fallback={<div>loading....</div>}>
							<Routes>
								<>
									<Route element={<Master />}>
										<Route path="/homepage" element={<HomePage />} />
									</Route>
									<Route
										path="/products/:id/:theme_id"
										element={<ProductInfoPage />}
									/>
								</>
								<Route path="/" element={<RegesterPage />} />
								{/* <Route path="/CheckOut" element={<CheckOut />} />
						<Route path="/access-denied" element={<Access_denied />} />
						<Route path="/*" element={<NotFound />} /> */}
							</Routes>
						</Suspense>
					</ErrorBoundary>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
