import { Switch, Route } from 'react-router-dom';
import '../src/ui/components/index.scss';
import '../src/sccs/index.scss';
import {
	LoginScreen,
	RegisterScreen,
  HomeScreen,
  ForgotPasswordScreen,
  ProfileScreen
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
        <Route path="/reset" exact>
          <ForgotPasswordScreen />
        </Route>
        <Route path="/profile" exact>
          <ProfileScreen />
        </Route>
			</Switch>
		</div>
	);
}

export default App;
