import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";

export default function LoginPage() {
	return (
		<div className="bg-white">
			<LoginHeader />
			<LoginForm />
		</div>
	);
}