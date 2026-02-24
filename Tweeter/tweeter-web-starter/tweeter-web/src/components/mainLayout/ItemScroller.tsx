import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import {
  PagedItemPresenter,
  PagedItemView,
} from "../../presenter/PagedItemPresenter";

interface Props<T, P extends PagedItemPresenter<T, any>> {
  featureUrl: string;
  presenterFactory: (view: PagedItemView<T>) => P;
  itemComponentGenerator: (item: T) => JSX.Element;
  containerItemWrapper?: (element: JSX.Element, index: number) => JSX.Element;
}

const ItemScroller = <T, P extends PagedItemPresenter<T, any>>(
  props: Props<T, P>,
) => {
  const { displayErrorMessage } = useMessageActions();
  const [items, setItems] = useState<T[]>([]);

  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const { displayedUser: displayedUserAliasParam } = useParams();

  const listener: PagedItemView<T> = {
    addItems: (newItems: T[]) =>
      setItems((previousItems) => [...previousItems, ...newItems]),
    displayErrorMessage,
  };

  const presenterRef = useRef<P | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = props.presenterFactory(listener);
  }

  useEffect(() => {
    if (
      authToken &&
      displayedUserAliasParam &&
      displayedUser &&
      displayedUserAliasParam !== displayedUser.alias
    ) {
      presenterRef
        .current!.getUser(authToken, displayedUserAliasParam)
        .then((toUser) => {
          if (toUser) setDisplayedUser(toUser);
        });
    }
  }, [displayedUserAliasParam]);

  useEffect(() => {
    setItems(() => []);
    presenterRef.current!.reset();
    presenterRef.current!.loadMoreItems(authToken!, displayedUser!.alias);
  }, [displayedUser]);

  const loadMoreItems = () => {
    presenterRef.current!.loadMoreItems(authToken!, displayedUser!.alias);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenterRef.current!.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => {
          const element = props.itemComponentGenerator(item);
          return props.containerItemWrapper
            ? props.containerItemWrapper(element, index)
            : element;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ItemScroller;
