import Btn from "./Btn";

export default function SubmitNewProduct() {
	// const [product_type, setProduct_type] = useState("shoe");
	// const [description, setDescription] = useState("");
	// const generateId = customAlphabet(
	// 	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
	// );

	// const id = generateId();

	// const sendData = async () => {
	// 	try {
	// 		const res = await axios.post(
	// 			"http://api.inspiration-sy.com:8880/api/cat/add",
	// 			{
	// 				name: "userName",
	// 				type: product_type,
	// 				id: generateId(),
	// 				description: "asdasd",
	// 				themes: [stateContainer],
	// 			},
	// 			{
	// 				headers: {
	// 					Accept: "application/json",
	// 					Authorization: "Bearer " + localStorage.getItem("token"),
	// 				},
	// 			}
	// 		);
	// 		console.log(res);
	// 	} catch (error) {
	// 		toast.error(error.message);
	// 	}
	// };

	return (
		<>
			<Btn variant="fill" className={` rounded px-4 py-2`}>
				<section
					className={` flex items-center justify-center bg-gray-700/70 backdrop-blur`}
				>
					<div className=" flex w-80 flex-col gap-2  rounded bg-gray-700 p-4">
						<div className=" flex gap-2">
							<div className="  text-black">
								<input
									className=" w-full rounded"
									placeholder="in stack"
									type="number"
								/>
							</div>
							<div className="  text-black">
								<input
									className=" w-full rounded"
									placeholder="type"
									type="text"
								/>
							</div>
						</div>
						<div className=" text-black">
							<textarea
								placeholder="write a description here..."
								minLength={15}
								maxLength={40}
								cols={10}
								rows={4}
								className={` w-full resize-none rounded`}
								name="description"
							/>
						</div>

						<div className=" flex  gap-2 ">
							<Btn
								variant="fill"
								className={`flex-grow rounded bg-red-400 px-4  py-2 capitalize`}
							>
								close
							</Btn>

							<Btn
								variant="fill"
								className={`flex-grow rounded px-4 py-2  capitalize`}
							>
								upload
							</Btn>
						</div>
					</div>
				</section>
			</Btn>
		</>
	);
}
