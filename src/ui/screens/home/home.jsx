import { useGlobalUser } from "../../../context";
import { Header, PostBox } from '../../components';
import './index.scss'

export function HomeScreen() {

	const [user] = useGlobalUser();
	return (
    <div className="home-container">
      <Header />
      <div className="home-container__posts">
        <PostBox />
        <PostBox />
        <PostBox />
        <PostBox />
      </div>
    </div>
	);
}
