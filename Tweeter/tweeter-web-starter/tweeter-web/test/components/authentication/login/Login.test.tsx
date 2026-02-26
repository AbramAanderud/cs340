import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render } from "@testing-library/react";

describe("Login Component", () => {
  it("starts with the sign in button disabled", () => {});
});

function renderLogin(originalURL: string) {
  return render(
    <MemoryRouter>
      <Login originalUrl={originalUrl} />
    </MemoryRouter>,
  );
}
