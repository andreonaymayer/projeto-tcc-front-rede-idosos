import { Switch, Route } from 'react-router-dom';
import '../src/ui/components/index.scss';
import '../src/sccs/index.scss';
import {
	LoginScreen,
	RegisterScreen,
  HomeScreen
} from './ui/screens';
function App() {

	return (
		<div>
			<Switch>
        <Route path="/" exact>
          <LoginScreen />
        </Route>
        <Route path="/register" exact>
          <RegisterScreen />
        </Route>
        <Route path="/home" exact>
          <HomeScreen />
        </Route>
			</Switch>
		</div>
	);
}

export default App;
