import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTeam from "./create-team";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("CreateTeam component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with initial state", () => {
    render(<CreateTeam />);

    expect(screen.getByLabelText(/Team Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Players \(one per line\)/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Team/i })).toBeInTheDocument();
  });

  test("displays validation message for invalid input", async () => {
    render(<CreateTeam />);

    fireEvent.click(screen.getByRole("button", { name: /Create Team/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Please ensure the team name starts with 'Team ' and enter 1 or 2 player names./i,
        ),
      ).toBeInTheDocument();
    });
  });

  test("trims and processes player input correctly", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { teamId: 12345 } });

    render(<CreateTeam />);

    fireEvent.change(screen.getByLabelText(/Team Name/i), { target: { value: "Team Heroes" } });
    fireEvent.change(screen.getByLabelText(/Players \(one per line\)/i), {
      target: { value: "  Player 1  \n\n Player 2 \n" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Team/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/teams/create", {
        name: "Heroes",
      });
    });
  });
});
