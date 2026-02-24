import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Status, User } from "tweeter-shared";

import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import ItemScroller from "./components/mainLayout/ItemScroller";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";

import { useUserInfo } from "./components/userInfo/UserInfoHooks";
import { PagedItemView } from "./presenter/PagedItemPresenter";

import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { FolloweePresenter } from "./presenter/FolloweePresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import { StatusItemPresenter } from "./presenter/StatusItemPresenter";
import { UserItemPresenter } from "./presenter/UserItemPresenter";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  const { displayedUser } = useUserInfo();

  const userRowWrapper = (element: JSX.Element, index: number) => (
    <div key={index} className="row mb-3 mx-0 px-0 border rounded bg-white">
      {element}
    </div>
  );

  const renderStatusScroller = (
    keyPrefix: string,
    featurePath: string,
    presenterFactory: (view: PagedItemView<Status>) => StatusItemPresenter,
  ) => (
    <ItemScroller
      key={`${keyPrefix}-${displayedUser!.alias}`}
      featureUrl={featurePath}
      presenterFactory={presenterFactory}
      itemComponentGenerator={(status: Status) => (
        <StatusItem status={status} featurePath={featurePath} />
      )}
    />
  );

  const renderUserScroller = (
    keyPrefix: string,
    featurePath: string,
    presenterFactory: (view: PagedItemView<User>) => UserItemPresenter,
  ) => (
    <ItemScroller
      key={`${keyPrefix}-${displayedUser!.alias}`}
      featureUrl={featurePath}
      presenterFactory={presenterFactory}
      itemComponentGenerator={(user: User) => (
        <UserItem user={user} featurePath={featurePath} />
      )}
      containerItemWrapper={userRowWrapper}
    />
  );

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={<Navigate to={`/feed/${displayedUser!.alias}`} />}
        />

        <Route
          path="feed/:displayedUser"
          element={renderStatusScroller(
            "feed",
            "/feed",
            (view) => new FeedPresenter(view),
          )}
        />

        <Route
          path="story/:displayedUser"
          element={renderStatusScroller(
            "story",
            "/story",
            (view) => new StoryPresenter(view),
          )}
        />

        <Route
          path="followees/:displayedUser"
          element={renderUserScroller(
            "followees",
            "/followees",
            (view) => new FolloweePresenter(view),
          )}
        />

        <Route
          path="followers/:displayedUser"
          element={renderUserScroller(
            "followers",
            "/followers",
            (view) => new FollowerPresenter(view),
          )}
        />

        <Route path="logout" element={<Navigate to="/login" />} />
        <Route
          path="*"
          element={<Navigate to={`/feed/${displayedUser!.alias}`} />}
        />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
