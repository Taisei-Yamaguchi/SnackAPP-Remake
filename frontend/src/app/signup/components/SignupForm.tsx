"use client"

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { signup } from '@/django_api/signup';
import { useAppDispatch } from '@/store';

const formSchema = yup.object().shape({
    username: yup
        .string()
        .required("username is required!"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required !"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match') 
        .required('Confirm Password is required!'),
    });
type FormData = {
    username: string;
    password: string;
    confirm_password: string; 
};

const FORM_DATA: FormData = {
    username: "",
    password: "",
    confirm_password: "",
};

const SignupForm = () => {
    const router = useRouter();
    const dispatch=useAppDispatch()
    const [ toast, setToast ] = useState({
        message: "",
        type: "",
    });

    const formik = useFormik<FormData>({
        initialValues: FORM_DATA,
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            if (formData.password !== formData.confirm_password) {
                setToast({ message: "Passwords do not match", type: "error" });
                return;
            }
            const { confirm_password, ...signupData } = formData;
            const data = await signup(signupData);
            console.log(data);
            if (data.error) {
                setToast({ message: data.error, type: "error" });
            } else {
                // here, login automatically before going to home.


                
                try {
                    // フォームデータをサーバーサイドに送信してログイン処理を行う
                    console.log(formData)
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
    
                    // ログインが成功した場合、サーバーサイドから受信したデータを取得
                    const data = await response.json();
                    // 受信したデータにエラーが含まれている場合はトーストを表示して終了
                    if (data.error) {
                        setToast({ message: data.error, type: "error" });
                        return;
                    }
    
                    // ログインが成功した場合、ホーム画面にリダイレクト
                    router.push('/home');
                } catch (error) {
                    // エラーハンドリング
                    console.error('Login error:', error);
                    setToast({ message: "Failed to login", type: "error" });
                }

                setToast({ message: data.message, type: "success" });
                setTimeout(() => {
                    router.push('/home');
                }, 500)
            }
            setTimeout(() => setToast({ message: "", type: "" }), 200);
            formik.resetForm();
            },
        });

    return (
        <div>
            {toast.message && (
            <div className={
            clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
            {
            "bg-red-500": toast.type === "error",
            "bg-green-500": toast.type === "success",
            }
        )}>{toast.message}</div>)}
            <form onSubmit={formik.handleSubmit}>
                {/* username */}
                <input 
                    id="username"
                    name="username"
                    type="text" 
                    value={formik.values.username} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    placeholder="Username"
                    className={clsx(
                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                        {
                            "border-2 border-red-500 bg-red-100 text-red-800":
                            formik.touched.username && formik.errors.username,
                        }
                    )}
                />
                {formik.errors.username && formik.touched.username && (
                        <p className="text-red-500 ml-1 my-3">{formik.errors.username}</p>
                    )}

                {/* password */}
                <input 
                    id='password'
                    name='password'
                    type="password" 
                    value={formik.values.password} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className={clsx(
                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
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

                {/* confirm password */}
                <input 
                    id="confirm_password"
                    name="confirm_password"
                    type="password" 
                    value={formik.values.confirm_password} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Confirm Password"
                    className={clsx(
                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                        {
                            "border-2 border-red-500 bg-red-100 text-red-800":
                            formik.touched.confirm_password && formik.errors.confirm_password,
                        }
                    )} 
                />
                {formik.errors.confirm_password && formik.touched.confirm_password && (
                    <p className="text-red-500 ml-1 my-3">
                        {formik.errors.confirm_password}
                    </p>
                )}
            <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
