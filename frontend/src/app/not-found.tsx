import Link from "next/link";

export default function NotFoundPage() {
	
	return (
		<div className="flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8 h-screen items-center space-y-8 bg-white">
			<h2 className="mt-5 text-center text-6xl font-bold leading-9 tracking-tight text-gray-900">
				Not Found
			</h2>
			<div
				className=" flex items-center flex-col m-y-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative space-y-6"
				role="alert"
			>
				<p className="font-bold">Error:</p>
				<p className="text-sm">Could not find requested resource 😵‍💫</p>
			</div>
			<Link className="text-sky-600" href="/">
				Return Home
			</Link>
		</div>
	);
}
