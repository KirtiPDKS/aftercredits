import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { EditYourDetailsPage } from "../../src/pages/Users/EditYourDetailsPage";
import { BrowserRouter } from "react-router-dom";
import { getCurrentUser } from "../../src/services/users";

vi.mock("../../src/services/users");
vi.mock("../../src/services/moviesWatched");

describe("EditYourDetailsPage", () => {
  beforeEach(() => {
    localStorage.setItem("token", "fake-token");
    global.fetch = vi.fn();
  });
  

it("loads and displays user data", async () => {
    getCurrentUser.mockResolvedValue({
        user: {
          username: "testuser",
          email: "test@test.com",
          profile_image: "image.jpg"
        }
    });

    render(
      <BrowserRouter>
        <EditYourDetailsPage />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByDisplayValue("testuser")).toBeInTheDocument()
    );
  });

  it("submits updated user data", async () => {
      getCurrentUser.mockResolvedValue({
        user: {
          username: "testuser",
          email: "test@test.com",
          profile_image: "image.jpg"
        }
      })
      .mockResolvedValue({
        ok: true,
        json: async () => ({})
      });

    render(
      <BrowserRouter>
        <EditYourDetailsPage />
      </BrowserRouter>
    );

    const input = await screen.findByDisplayValue("testuser");

    await userEvent.clear(input);
    await userEvent.type(input, "updated");

    const button = screen.getByRole("button", { name: /update details/i });
    await userEvent.click(button);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledTimes(1)
    );
  });
});
