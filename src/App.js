import { Switch, Route } from 'react-router-dom';
import '../src/ui/components/index.scss';
import '../src/sccs/index.scss';
import {
	LoginScreen,
	RegisterScreen,
  HomeScreen,
  ForgotPasswordScreen,
  ProfileScreen,
  ChangePassword,
  CreatePostScreen,
  SearchFriendsScreen,
  ListFriendsRequestsScreen,
  ListFriendsScreen,
  HelpScreen,
  HomeEventsScreen,
  AlbumScreen
} from './ui/screens';
import { CreateEventBox } from './ui/components';
import {HelpInitial} from "./ui/screens/help-initial/help";
function App() {
  setTimeout(() => {
    let removeIframe = document.getElementsByTagName('iframe');
    if(removeIframe[0]) removeIframe[0].remove()
  }, 1000);

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
        <Route path="/help" exact>
          <HelpScreen />
        </Route>
        <Route path="/help-initial" exact>
          <HelpInitial />
        </Route>
        <Route path="/reset" exact>
          <ForgotPasswordScreen />
        </Route>
        <Route path="/profile" exact>
          <ProfileScreen />
        </Route>
        <Route path="/change-password" exact>
          <ChangePassword />
        </Route>
        <Route path="/create-post" exact>
          <CreatePostScreen />
        </Route>
        <Route path="/search-friend" exact>
          <SearchFriendsScreen />
        </Route>
        <Route path="/friends-requests" exact>
          <ListFriendsRequestsScreen />
        </Route>
        <Route path="/friends" exact>
          <ListFriendsScreen />
        </Route>
        <Route path="/create-event" exact>
          <CreateEventBox />
        </Route>
        <Route path="/home-events" exact>
          <HomeEventsScreen />
        </Route>
        <Route path="/album" exact>
          <AlbumScreen />
        </Route>
			</Switch>
		</div>
	);
}

export default App;
