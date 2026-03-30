import { FaXmark } from "react-icons/fa6";
export interface ModalProps {
	show?: boolean;
	close?: Function;
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	closeOutSide?: boolean;
}
const Modal: React.FC<ModalProps> = ({
	show,
	close,
	children,
	className,
	containerClassName,
	closeOutSide = true,
}) => {
	return (
		<>
			{show && (
				<div
					className={`${
						containerClassName ||
						"fixed h-full w-full top-0  flex justify-end z-50 flex-col backdrop-blur-sm right-0 transition ease-in-out delay-150 "
					}`}
				>
					<div
						className={`fixed w-full h-full bg-gray-900 opacity-50`}
						onClick={e => close && closeOutSide && close()}
					></div>
					<div
						className={`relative bg-white mx-auto shadow-lg h-full mr-0 overflow-y-visible	
						 ${className?.includes("w-") ? "" : "w-1/3"} ${
							className?.includes("z-") ? "" : "z-50"
						} ${className} `}
					>
						{close && (
							<div className="absolute right-0 grid w-auto justify-items-end z-50">
								<div
									className="mt-3 mr-3 cursor-pointer text-black"
									onClick={() => close && close()}
								>
									<FaXmark />
									&nbsp;
								</div>
							</div>
						)}
						<div className="h-full overflow-scroll overflow-x-hidden">{children}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
