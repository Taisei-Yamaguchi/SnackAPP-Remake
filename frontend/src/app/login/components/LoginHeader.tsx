const LoginHeader = () => {
	return (
		<header className="bg-gradient-to-r from-red-500 to-pink-500 fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between p-2">
			{/* left menu */}
			<div className="flex items-center space-x-2">
				<button type="button" className="text-base asideOpen">
                    <a href="/home" className="font-bold text-white">SnackApp</a>
				</button>
			</div>

			{/* right menu */}
			<a href ='/signup' className="badge badge-ghost">Signup</a>
		</header>
	);
};

export default LoginHeader;
