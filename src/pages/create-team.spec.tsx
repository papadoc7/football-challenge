import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import CreateTeam from "./create-team";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CreateTeam Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays an error message if the team name does not start with 'Team '", () => {
    render(<CreateTeam />);

    // Input with incorrect format
    fireEvent.change(
      screen.getByPlaceholderText("Enter team name followed by player name(s) (one per line)"),
      {
        target: { value: "Football Team\nPlayer 1" },
      },
    );

    fireEvent.click(screen.getByText("Create Team"));

    expect(
      screen.getByText(
        "Please ensure the first line starts with 'Team ' and enter 1 or 2 player names.",
      ),
    ).toBeInTheDocument();
  });

  it("displays an error message if there are not 1 or 2 players", () => {
    render(<CreateTeam />);

    // Input with team name correctly formatted but too many players
    fireEvent.change(
      screen.getByPlaceholderText("Enter team name followed by player name(s) (one per line)"),
      {
        target: { value: "Team Football\nPlayer 1\nPlayer 2\nPlayer 3" },
      },
    );

    fireEvent.click(screen.getByText("Create Team"));

    expect(
      screen.getByText(
        "Please ensure the first line starts with 'Team ' and enter 1 or 2 player names.",
      ),
    ).toBeInTheDocument();
  });

  it("submits successfully and displays success message when the input is valid", async () => {
    mockedAxios.post.mockResolvedValue({ data: { teamId: 1 } });

    render(<CreateTeam />);

    // Input with correct team format and player count
    fireEvent.change(
      screen.getByPlaceholderText("Enter team name followed by player name(s) (one per line)"),
      {
        target: { value: "Team Football\nPlayer 1\nPlayer 2" },
      },
    );

    fireEvent.click(screen.getByText("Create Team"));

    // Await for success message to be rendered after API response
    const successMessage = await screen.findByText("Team created! Team ID: 1");
    expect(successMessage).toBeInTheDocument();
    expect(mockedAxios.post).toHaveBeenCalledWith("/api/teams/create", { name: "Football" });
  });
});
