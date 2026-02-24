import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate, useOutletContext} from "react-router-dom";
import { login } from "../../src/services/authentication";

import { LoginPage } from "../../src/pages/Login/LoginPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock,
    useOutletContext: () => ({ setLoggedIn: vi.fn() })
   };
});

// Mocking the login service
vi.mock("../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

// Reusable function for filling out login form, using username
async function completeLoginFormWithUsername() {
  const user = userEvent.setup();

  const userInputEl = screen.getByPlaceholderText("Email or Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(userInputEl, "testusername");
  await user.type(passwordInputEl, "ValidPassword1");
  await user.click(submitButtonEl);
}

// Reusable function for filling out login form, using email
async function completeLoginFormWithEmail() {
  const user = userEvent.setup();

  const userInputEl = screen.getByPlaceholderText("Email or Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(userInputEl, "test@test.com");
  await user.type(passwordInputEl, "ValidPassword1");
  await user.click(submitButtonEl);
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to login with username", async () => {
    render(<LoginPage />);

    await completeLoginFormWithUsername();

    expect(login).toHaveBeenCalledWith("testusername", "ValidPassword1");
  });

  test("allows a user to login with email", async () => {
    render(<LoginPage />);

    await completeLoginFormWithEmail();

    expect(login).toHaveBeenCalledWith("test@test.com", "ValidPassword1");
  });

  test("navigates to /posts on successful login", async () => {
    render(<LoginPage />);

    login.mockResolvedValue("secrettoken123");
    const navigateMock = useNavigate();

    await completeLoginFormWithUsername();

    expect(navigateMock).toHaveBeenCalledWith("/movies");
  });

  test("navigates to /login on unsuccessful login", async () => {
    render(<LoginPage />);

    login.mockRejectedValue(new Error("Error logging in"));
    const navigateMock = useNavigate();

    await completeLoginFormWithUsername();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

    test("correct error message on screen when email or username not found", async () => {
    render(<LoginPage />);

    login.mockRejectedValue(new Error("User not found"));

    await completeLoginFormWithUsername();

    expect(
      await screen.findByText("User not found")
    );
  });

    test("correct error message on screen when password incorrect", async () => {
    render(<LoginPage />);

    login.mockRejectedValue(new Error("Password incorrect"));

    await completeLoginFormWithUsername();

    expect(
      await screen.findByText("Password incorrect")
    );
  });
});
