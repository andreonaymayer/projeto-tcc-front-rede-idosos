import { useGlobalUser } from "../../../context";

export function HomeScreen() {

	const [user] = useGlobalUser();
	return (
		<h1>{user}</h1>
	);
}
