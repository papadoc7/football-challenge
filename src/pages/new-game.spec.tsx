import { render, screen } from "@testing-library/react";
import NewGame from "./new-game";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("NewGame component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Team A" },
        { id: 2, name: "Team B" },
      ],
    });
    window.alert = jest.fn();
  });

  test("renders component with initial state", () => {
    render(<NewGame />);

    expect(screen.getByText(/Game Date:/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start Game/i })).toBeInTheDocument();
    expect(screen.getByText("Team 1")).toBeInTheDocument();
    expect(screen.getByText("Team 2")).toBeInTheDocument();
  });
});
