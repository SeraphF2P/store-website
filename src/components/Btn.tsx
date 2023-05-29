import type { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from "react";
import { cn, variants, type variantsType } from "../lib/cva";
type ReactRenderedChildrenProps = (props: unknown) => JSX.Element | ReactNode;
export interface BtnProps
	extends Omit<
			ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>,
			"children"
		>,
		variantsType {
	onClick?: (_val: any) => void;
	onToggle?: string;
	toggled?: boolean;
	status?: string;
	hasStatus?: boolean;
	children?: ReactRenderedChildrenProps | ReactNode;
}

const Btn: FC<BtnProps> = ({
	onClick,
	status,
	hasStatus = false,
	className,
	variant,
	shape,
	children,
	...props
}) => {
	const renderedProps = {
		hasStatus,
	};

	return (
		<>
			<button
				onClick={(e: MouseEvent) => {
					e.stopPropagation();
					if (typeof onClick == "function") {
						onClick({ hasStatus });
					}
				}}
				className={cn(
					variants({ variant, shape, className }),
					hasStatus && status
				)}
				{...props}
			>
				{typeof children === "function" ? children(renderedProps) : children}
			</button>
		</>
	);
};
export default Btn;
