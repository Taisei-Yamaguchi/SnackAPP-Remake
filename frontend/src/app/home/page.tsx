import SnackSearch from "./components/SnackSearch";
import SnackList from "./components/SnackList";
export default function Home() {
	return (
		<div className="bg-white">
			<SnackSearch />
			<SnackList />
		</div>
	);
}