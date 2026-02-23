import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/StatusService";
import { UserService } from "../model.service/UserService";

export interface StatusItemView {
  addItems: (newItems: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {
  private _view: StatusItemView;

  private statusService = new StatusService();
  private userService = new UserService();

  private _hasMoreItems = true;
  private _lastItem: Status | null = null;

  protected constructor(view: StatusItemView) {
    this._view = view;
  }

  protected get view() {
    return this._view;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(value: Status | null) {
    this._lastItem = value;
  }

  protected get service() {
    return this.statusService;
  }

  public reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }

  public async getUser(
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> {
    return this.userService.getUser(authToken, alias);
  }

  public abstract loadMoreItems(
    authToken: AuthToken,
    user: User,
  ): Promise<void>;
}
