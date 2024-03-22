import SignupForm from "./components/SignupForm";
import SignupHeader from "./components/SignupHeader";

export default function SignUp() {
	return (
		<div className="bg-white">
			<SignupHeader />
			<SignupForm/>
		</div>
	);
}