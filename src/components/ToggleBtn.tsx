import { useEffect, useState } from "react";
import { cn, variants } from "../lib/cva";
import Btn, { BtnProps } from "./Btn";

interface ToggleBtnType extends BtnProps {
	whenToggled: string;
	toggleState?: boolean;
}

const ToggleBtn = ({
	children,
	whenToggled,
	onClick,
	toggleState = false,
	className,
	variant,
	shape,
	disable,
	...props
}: ToggleBtnType) => {
	const [isToggled, setIsToggled] = useState(toggleState);
	useEffect(() => {
		setIsToggled(toggleState);
	}, [toggleState]);
	return (
		<Btn
			onClick={() => {
				setIsToggled(!isToggled);
				if (typeof onClick == "function") onClick({ isToggled });
			}}
			{...props}
			className={cn(
				variants({ variant, shape, disable, className }),
				isToggled && whenToggled
			)}
		>
			{typeof children == "function" ? children(isToggled) : children}
		</Btn>
	);
};

export default ToggleBtn;
