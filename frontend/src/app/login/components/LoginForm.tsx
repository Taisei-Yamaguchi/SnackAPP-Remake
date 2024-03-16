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

            <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
