"use client"
import { useState,useEffect } from "react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from 'yup';
import clsx from 'clsx';
import { snackCreate } from "@/django_api/snack_create";

const PostSnack = ()=>{
	const router= useRouter()
    const [ isOpen, setIsOpen ] = useState(false);
	const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
	const [imageFieldKey, setImageFieldKey] = useState(Date.now());
  

	const formSchema = yup.object().shape({
		name: yup
			.string()
			.required("name is required!"),
		maker: yup
			.string()
			.required("maker is required !"),
		type: yup
			.string()
			.required("type is required !"),
		country: yup
			.string()
			.required("country is required !"),
		price: yup
			.string() 
			.matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number with up to two decimal places")  // 正規表現で小数点第二位までの数値をチェック
			.required("Price is required!"),
		url: yup
			.string()
			.url("URL must be in a valid format")
			.nullable(),
		image: yup
			.mixed()
			.test('fileType', 'Only image files are allowed', (value) => {
				if (!value) return true; 
				const supportedTypes = ['image/jpg','image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']; 
				return !!(value && (value as File).type && supportedTypes.includes((value as File).type));
			})
			.nullable()
		});

	type FormType = {
		name: string;
		maker: string;
		type: string;
		country: string;
		price: number;
		url:string;
		image: File | null
	};
	
	const FORM_DATA: FormType = {
		name: "",
		maker: "",
		type: "",
		country: "",
		price: 1,
		url: "",
		image: null
	};

	const [ toast, setToast ] = useState({
        message: "",
        type: "",
    });

    const formik = useFormik<FormType>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData:FormType) => {
			console.log(formData)
			
            try {
				// Exclude empty url and price
				const filteredFormData = {
					...formData,
					url: formData.url !== '' ? formData.url : null,
				};
				if(account&&token){
					console.log("formData",formData)
					snackCreate(filteredFormData,token)
					setIsOpen(false)
				}else{
					router.push('/login')
				}
				
            } catch (error) {
                // error
                console.error('Post error:', error);
                setToast({ message: "Failed to post snack", type: "error" });
            }
            },
        });
	
	useEffect(()=>{
		setIsOpen(false)
	}, [])

	const openModal = () => {
		if(!account||!token){
			return router.push('/login')
		}
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};


    return(
        <>
            {/* Open modal button */}
			<div className='flex justify-center'>
				<button className="bg-slate-600 p-2 rounded text-white btn btn-secondary" type="button" onClick={openModal}>
					<p>Post New Snack</p>
				</button>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-100 bg-opacity-50 transform scale-100 transition-transform duration-300 border-radius">
					<div className="bg-white p-12 w-full overflow-y-auto">
						{/* Close modal button */}
						<button className="focus:outline-none" type="button" onClick={closeModal}>
							{/* Hero icon - close button */}
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						{/* Modal content */}
						{toast.message && (
						<div className={
							clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
							{
							"bg-red-500": toast.type === "error",
							"bg-green-500": toast.type === "success",
							}
						)}>{toast.message}
						</div>)}
						<div className="w-full  h-full">
							<h2 className='text-xl '>Post New Snack</h2>
							<div className="card shrink-0 w-full shadow-2xl bg-base-100">
								<form className="card-body  w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">

								<div className="flex ">
									{/* name */}
									<div className="form-control">
										<label className="label">
											<span className="label-text">Name</span>
										</label>
										<input 
											id="name"
											name="name"
											type="text" 
											value={formik.values.name} 
											onChange={formik.handleChange} 
											onBlur={formik.handleBlur}
											placeholder="Name"
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.name && formik.errors.name,
												}
												)}
												required
										/>
										{formik.errors.name && formik.touched.name && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.name}
											</p>
										)}
									</div>
											
									{/* maker */}
									<div className="form-control">
									<label className="label">
											<span className="label-text">Maker</span>
										</label>
										<input 
											id="maker"
											name="maker"
											type="text" 
											value={formik.values.maker} 
											onChange={formik.handleChange} 
											onBlur={formik.handleBlur}
											placeholder="Maker"
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.maker && formik.errors.maker,
												}
												)}
												required
										/>
										{formik.errors.maker && formik.touched.maker && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.maker}
											</p>
										)}
									</div>
									</div>

									<div className="flex">

									{/* type */}
									<div className="form-control">
										<label className="label">
											<span className="label-text">Type</span>
										</label>
										<select 
										id="type" 
										name="type" 
										value={formik.values.type} 
										onChange={formik.handleChange} 
										onBlur={formik.handleBlur}
										className={clsx(
											"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
											{
												"border-2 border-red-500 bg-red-100 text-red-800":
												formik.touched.type && formik.errors.type,
											}
											)}
											required
										>
											<option value="">Type</option>
											<option value="snack">Snack</option>
											<option value="chocolate">Chocolate</option>
											<option value="cookie">Cookie</option>
											<option value="senbei">Senbei</option>
											<option value="candy">Candy,Gumi,Ramune etc</option>
											<option value="other">Other</option>
										</select>
										{formik.errors.type && formik.touched.type && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.type}
											</p>
										)}
									</div>

								{/* country */}
								<div className="form-control">
									<label className="label">
										<span className="label-text">Country</span>
									</label>
									<select
									id="country"
									name="country" 
									value={formik.values.country} 
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									className={clsx(
										"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
										{
											"border-2 border-red-500 bg-red-100 text-red-800":
											formik.touched.country && formik.errors.country,
										}
										)}
										required
									>
										<option value="">Country</option>
										<option value="Japan">Japan</option>
										<option value="Canada">Canada</option>
										<option value="Other">Other</option>
									</select>

									{formik.errors.country && formik.touched.country && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.country}
											</p>
										)}
									</div>

									{/* price */}
									<div className="form-control">
										<label className="label">
											<span className="label-text">Price
											{formik.values.country==='Canada' ? (
												<> (Ca$)</>
											):(
												<> (￥)</>
											)}
											</span>
										</label>
										<input 
											id="price"
											name="price"
											type="number" 
											value={formik.values.price} 
											onChange={formik.handleChange} 
											onBlur={formik.handleBlur}
											placeholder="Price"
											step="0.01" 
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.price && formik.errors.price,
												}
												)}
												
										/>
										{formik.errors.price && formik.touched.price && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.price}
											</p>
										)}
									</div>
									</div>

									<div className="flex flex-col justify-between">
									{/* url */}
									<div className="form-control">
										<label className="label">
											<span className="label-text">URL</span>
										</label>
										<input 
											id="url"
											name="url"
											type="text" 
											value={formik.values.url} 
											onChange={formik.handleChange} 
											onBlur={formik.handleBlur}
											placeholder="URL"
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.url && formik.errors.url,
												}
												)}
										/>
										{formik.errors.url && formik.touched.url && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.url}
											</p>
										)}
									</div>
									{/* image */}
									<div className="form-control">
										<label className="label">
											<span className="label-text">Image</span>
										</label>
										<input
											key={imageFieldKey}
											id="image"
											type="file"
											name="image"
											className={clsx(
												"input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
												{
													"border-2 border-red-500 bg-red-100 text-red-800":
													formik.touched.price && formik.errors.price,
												}
												)}
											onChange={(event) => {
											return formik.setFieldValue("image", event.target.files![0]);
											}}
										/>
									</div>
									{formik.errors.image && formik.touched.image && (
											<p className="text-red-500 ml-1 my-3">
												{formik.errors.image}
											</p>
										)}
									</div>

									<div className="form-control mt-6">
										<button type="submit" className="btn btn-primary">Post</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
        </>
    )
}

export default PostSnack