import SnackSearch from "./components/SnackSearch";
import SnackList from "./components/SnackList";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
	return (
		<div className="bg-white">
			<HomeHeader />
			<div className="mt-16">
			<SnackSearch />
			<SnackList />
			</div>
		</div>
	);
}