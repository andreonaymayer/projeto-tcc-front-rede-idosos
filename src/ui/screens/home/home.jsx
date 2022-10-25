import { useGlobalUser } from "../../../context";
import { Header } from '../../components';
import './index.scss'

export function HomeScreen() {

	const [user] = useGlobalUser();
	return (
    <div className="home-container">
      <Header />
      Teste
    </div>
	);
}
