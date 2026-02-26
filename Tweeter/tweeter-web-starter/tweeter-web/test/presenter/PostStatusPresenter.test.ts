import { anything, capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter";
import { AuthToken, User } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";

describe("PostStatusPresenter", () => {
  let mockView: PostStatusView;
  let presenter: PostStatusPresenter;
  let mockService: StatusService;

  const authToken = new AuthToken("abc123", Date.now());
  const currentUser = new User("Abe", "A", "@a", "url");
  const post = "status";

  beforeEach(() => {
    mockView = mock<PostStatusView>();
    const viewInstance = instance(mockView);

    when(mockView.displayInfoMessage("Posting status...", 0)).thenReturn("messageId123");

    const presenterSpy = spy(new PostStatusPresenter(viewInstance));
    presenter = instance(presenterSpy);

    mockService = mock<StatusService>();
    when((presenterSpy as any).service).thenReturn(instance(mockService));

    when(mockService.postStatus(anything(), anything())).thenResolve();
  });

  it("tells the view to display a posting status message", async () => {
    await presenter.postStatus(post, currentUser, authToken);
    verify(mockView.displayInfoMessage("Posting status...", 0)).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token", async () => {
    await presenter.postStatus(post, currentUser, authToken);

    verify(mockService.postStatus(authToken, anything())).once();

    const [capturedToken, capturedStatus] = capture(mockService.postStatus).last();
    expect(capturedToken).toEqual(authToken);
    expect(capturedStatus.post).toEqual(post);
    expect(capturedStatus.user).toEqual(currentUser);
  });

  it("tells the view to clear the info message that was displayed previously, clear the post, and display a status posted message when successful", async () => {
    await presenter.postStatus(post, currentUser, authToken);

    verify(mockView.deleteMessage("messageId123")).once();
    verify(mockView.clearPost()).once();
    verify(mockView.displayInfoMessage("Status posted!", 2000)).once();

    verify(mockView.displayErrorMessage(anything())).never();
  });

  it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message when unsuccessful", async () => {
    when(mockService.postStatus(anything(), anything())).thenThrow(new Error("An error occurred"));

    await presenter.postStatus(post, currentUser, authToken);

    verify(mockView.deleteMessage("messageId123")).once();
    verify(mockView.displayErrorMessage(anything())).once();

    verify(mockView.clearPost()).never();
    verify(mockView.displayInfoMessage("Status posted!", 2000)).never();
  });
});
