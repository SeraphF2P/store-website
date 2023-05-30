import { AnimatePresence, motion as m } from "framer-motion";
import { FC, Key, useState } from "react";
import { host } from "../host";

interface ProductThemesGalleryProps {
	themes: any;
	activeTheme: any;
	setactiveTheme: any;
}

const ProductThemesGallery: FC<ProductThemesGalleryProps> = ({
	themes,
	activeTheme,
	setactiveTheme,
}) => {
	return (
		<AnimatePresence>
			{themes &&
				themes.map(
					(theme: {
						id: string | undefined;
						image: Key | null | undefined;
					}) => {
						return (
							<>
								{theme.id != activeTheme.id ? (
									<m.div
										transition={{
											layout: { type: "tween", duration: 0.7 },
										}}
										layoutId={theme.id}
										key={theme.image}
										onClick={() => setactiveTheme(theme.id)}
										className={` relative w-20 sm:w-40 object-cover  h-24 overflow-hidden rounded-sm `}
									>
										<img
											className={`absolute inset-0 -translate-y-1/2 top-1/2 w-full max-w-full object-cover`}
											src={host + "/storage/" + theme.image}
											alt="product image"
										/>
									</m.div>
								) : (
									<m.div
										key={activeTheme.image}
										transition={{
											layout: { type: "tween", duration: 0.7 },
										}}
										layoutId={activeTheme.id}
										className={` relative w-20 sm:w-40 object-cover order-1  h-24 overflow-hidden rounded-sm  `}
									>
										<img
											className={`absolute inset-0  -translate-y-1/2 top-1/2 max-w-full w-full object-cover`}
											src={host + "/storage/" + activeTheme.image}
											alt="product image"
										/>
									</m.div>
								)}
							</>
						);
					}
				)}
		</AnimatePresence>
	);
};

export default ProductThemesGallery;
