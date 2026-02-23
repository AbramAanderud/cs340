import { AuthToken, User } from "tweeter-shared";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export const PAGE_SIZE = 10;

export class FeedPresenter extends StatusItemPresenter {
  public constructor(view: StatusItemView) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, user: User): Promise<void> {
    try {
      const [newItems, hasMore] = await this.service.loadMoreFeedItems(
        authToken,
        user,
        PAGE_SIZE,
        this.lastItem,
      );

      this.hasMoreItems = hasMore;

      if (newItems.length > 0) {
        this.lastItem = newItems[newItems.length - 1];
      }

      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load feed items because of exception: ${error}`,
      );
    }
  }
}
