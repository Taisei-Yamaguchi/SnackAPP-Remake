"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div className="flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8 h-screen items-center space-y-8 bg-white">
			<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Something Wrong Happened:
			</h2>
			<div
				className=" flex items-center flex-col m-y-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative space-y-6"
				role="alert"
			>
				<p className="font-bold">Error:</p>
				<p className="text-sm">{error.message}</p>
			</div>
			<div>
				<button
					onClick={() => reset()}
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
