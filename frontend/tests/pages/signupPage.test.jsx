import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
async function completeSignupForm() {
  const user = userEvent.setup();

  const emailInputEl = screen.getByPlaceholderText("Email");
  const useranmeInputEl = screen.getByPlaceholderText("Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(useranmeInputEl, "testusername");
  await user.type(passwordInputEl, "ValidPassword1");
  await user.click(submitButtonEl);
}

async function completeSignupFormInvalid() {
  const user = userEvent.setup();

  const emailInputEl = screen.getByPlaceholderText("Email");
  const useranmeInputEl = screen.getByPlaceholderText("Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "email");
  await user.type(useranmeInputEl, "testusername");
  await user.type(passwordInputEl, "invalid");
  await user.click(submitButtonEl);
}

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup with valid password", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("test@email.com",'testusername', "ValidPassword1");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("correct error messages appear when password invalid", async () => {
    render(<SignupPage />);

    await completeSignupFormInvalid();

    expect(screen.getAllByText("Password under 8 characters"));
    expect(screen.getAllByText("Password needs a capital letter"));
    expect(screen.getAllByText("Password needs a number"));
  })

    test("correct error messages appear when email invalid", async () => {
    render(<SignupPage />);

    await completeSignupFormInvalid();

    expect(screen.getAllByText("Email needs an @"));
    expect(screen.getAllByText('Email needs a dot'))
  })
    test("correct error message on screen when email or username not found", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Email or username already in use"));

    await completeSignupForm();

    expect(await screen.findByText("Email or username already in use"))
    });
});
