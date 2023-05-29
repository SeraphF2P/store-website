export const fadeUp = {
	hidden: {
		opacity: 0,
		y: "8px",
	},
	show: {
		opacity: 1,
		y: "0",
	},
};
export const cartAnimation = {
	show: {
		clipPath: "circle(300% at 90% 40px)",
		pointerEvents: "auto",
	},
	hidden: {
		clipPath: "circle(0% at 90% 40px)",
		pointerEvents: "none",
	},
};
export const burgerMenuAnimation = {
	close: { clipPath: "circle(0% at 40px 40px)", pointerEvents: "none" },
	open: { clipPath: "circle(300% at 40px 40px)", pointerEvents: "auto" },
};
export const overlayer = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.5,
			ease: "linear",
			delayChildren: 0.1,
			staggerChildren: 0.1,
		},
	},
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			ease: "linear",
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};
export const pageTransition = {
	hidden: { opacity: 0, y: "16px" },
	show: {
		opacity: 1,
		y: "0",
		transition: {
			ease: "linear",
			duration: 0.7,
		},
	},
};
export const fadeInItem = {
	hidden: { opacity: 0, y: "100%" },
	show: {
		opacity: 1,
		y: "0",
		transition: {
			ease: "linear",
			duration: 0.7,
		},
	},
};
export const slideIn = {
	hidden: { opacity: 0, x: "-100%" },
	show: {
		opacity: 1,
		x: "0",
	},
};

export const slideOut = {
	hidden: { x: "100%", opacity: 0 },
	show: {
		x: "0",
		opacity: 1,
	},
};
