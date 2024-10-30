import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { format } from "date-fns";
import NewGame from "./new-game";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mocking window.alert
beforeAll(() => {
  window.alert = jest.fn();
});

describe("NewGame Component", () => {
  test("renders NewGame component with default values", () => {
    render(<NewGame />);

    const todayDate = format(new Date(), "dd-MM-yyyy");
    expect(screen.getByText(`Game Date: ${todayDate}`)).toBeInTheDocument();

    // Check if the team IDs are set to defaults
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  test("starts a new game on button click", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { gameId: 12345 } });

    render(<NewGame />);

    fireEvent.click(screen.getByRole("button", { name: /start game/i }));

    // Expect API call and alert with game ID
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/games/start", {
        team_1_id: 1,
        team_2_id: 2,
        date_played: expect.any(String),
      });
    });
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("Game has been started! Game ID: 12345"),
    );
  });

  test("updates team IDs based on user input", () => {
    render(<NewGame />);

    // Update team A ID
    const teamAInput = screen.getByPlaceholderText("Enter ID of first team");
    fireEvent.change(teamAInput, { target: { value: "5" } });
    expect(teamAInput).toHaveValue("5");

    // Update team B ID
    const teamBInput = screen.getByPlaceholderText("Enter ID of second team");
    fireEvent.change(teamBInput, { target: { value: "10" } });
    expect(teamBInput).toHaveValue("10");
  });
});
