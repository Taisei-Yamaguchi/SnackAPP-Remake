"use client"

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { login } from '@/django_api/login';

const formSchema = yup.object().shape({
    username: yup
        .string()
        .required("username is required!"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required !"),
    });
type FormData = {
    username: string;
    password: string;
};

const FORM_DATA: FormData = {
    username: "",
    password: "",
};

const LoginForm = () => {
    const router = useRouter();
    const [ toast, setToast ] = useState({
        message: "",
        type: "",
    });

    const formik = useFormik<FormData>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            try {
                setToast({  message: "Login processing", type: 'load' });
                const response = await fetch('/api/auth/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({formData}),
                });

                if (!response.ok) {
                    throw new Error('Failed to login');
                }
                const data = await response.json();
                if (data.error) {
                    setToast({ message: data.error, type: "error" });
                    return;
                }
                router.push('/home');
            } catch (error) {
                console.error('Login error:', error);
                setToast({ message: "Failed to login", type: "error" });
            }
            },
        });

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {toast.message && (
			<div className={
				clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
				    {
					    "bg-red-500": toast.type === "error",
						"bg-green-500": toast.type === "load",
					}
				)}>
                    {toast.type==="load"?(
                        <>{toast.message}
                        <span className="loading loading-dots loading-lg"></span>
                        </>
                    ):(
                    <>{toast.message}</>
                    )}
			</div>)}

            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h1 className='self-center text-xl'>Login</h1>
				<form onSubmit={formik.handleSubmit} className="card-body">
                    {/* username */}
                    <div className="form-control">
                        <label className="label">
							<span className="label-text">Username</span>
						</label>
                        <input 
                            id="username"
                            name="username"
                            type="text" 
                            value={formik.values.username} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            placeholder="Username"
                            className={clsx(
                                "input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.username && formik.errors.username,
                                }
                                )}
                                required
                        />
                        {formik.errors.username && formik.touched.username && (
                            <p className="text-red-500 ml-1 my-3">
                                {formik.errors.username}
                            </p>
                        )}
                    </div>
                    {/* password */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
                        <input 
                            id='password'
                            name='password'
                            type="password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Password"
                            className={clsx(
                                "input input-bordered  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                                {
                                    "border-2 border-red-500 bg-red-100 text-red-800":
                                    formik.touched.password && formik.errors.password,
                                }
                            )} 
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-red-500 ml-1 my-3">
                                {formik.errors.password}
                            </p>
                        )}
                        <label className="label">
                            <a href="/home" className="label-text-alt link link-hover">Just review without login</a>
                        </label>
                        <label className="label">
                            <a href="/signup" className="label-text-alt link link-hover">Signup</a>
                        </label>
									
					</div>
						<div className="form-control mt-6">
						    <button type='submit' className="btn btn-primary">Login</button>
						</div>
				</form>
			</div>
        </div>
    );
};

export default LoginForm;
