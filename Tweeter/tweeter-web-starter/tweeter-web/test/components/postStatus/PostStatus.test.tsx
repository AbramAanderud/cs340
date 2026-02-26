import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { anything, instance, mock, verify, when } from "@typestrong/ts-mockito";
import { AuthToken, User } from "tweeter-shared";

jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHooks"),
  __esModule: true,
  useUserInfo: jest.fn(),
}));
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";

jest.mock("../../../src/presenter/PostStatusPresenter");
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";

describe("PostStatus Component", () => {
  const mockUser = new User("firstName", "lastName", "@alias", "url");
  const mockAuthToken = new AuthToken("abc123", Date.now());

  beforeAll(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUser,
      authToken: mockAuthToken,
    });
  });

  function setupMockPresenter() {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    when(mockPresenter.checkButtonStatus(anything(), anything(), anything())).thenCall(
      (post: string) => !post.trim(),
    );

    (PostStatusPresenter as unknown as jest.Mock).mockImplementation(() => mockPresenterInstance);

    return { mockPresenter };
  }

  it("when first rendered the Post Status and Clear buttons are both disabled", () => {
    setupMockPresenter();

    const { postButton, clearButton } = renderPostStatusAndGetElements();
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("both buttons are enabled when the text field has text", async () => {
    setupMockPresenter();

    const { postButton, clearButton, postField, user } = renderPostStatusAndGetElements();

    await user.type(postField, "hello");

    expect(postButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });

  it("both buttons are disabled when the text field is cleared", async () => {
    setupMockPresenter();

    const { postButton, clearButton, postField, user } = renderPostStatusAndGetElements();

    await user.type(postField, "hello");
    expect(postButton).toBeEnabled();
    expect(clearButton).toBeEnabled();

    await user.clear(postField);
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("presenter's submitPost is called with correct parameters when Post Status is pressed", async () => {
    const { mockPresenter } = setupMockPresenter();

    const postText = "hello";

    const { postButton, postField, user } = renderPostStatusAndGetElements();

    await user.type(postField, postText);
    await user.click(postButton);

    verify(mockPresenter.submitPost(postText, mockUser, mockAuthToken)).once();
  });
});

function renderPostStatus() {
  return render(
    <MemoryRouter>
      <PostStatus />
    </MemoryRouter>,
  );
}

function renderPostStatusAndGetElements() {
  const user = userEvent.setup();

  renderPostStatus();

  const postButton = screen.getByRole("button", { name: /post status/i });
  const clearButton = screen.getByRole("button", { name: /clear/i });
  const postField = screen.getByPlaceholderText(/what's on your mind\?/i);

  return { user, postButton, clearButton, postField };
}
