import { render, screen, fireEvent } from "@testing-library/react";
import { MovieModal } from "./MovieModal";
import { Movie } from "@/types/api";

const mockMovie: Movie = {
  id: 1,
  title: "Inception",
  year: 2010,
  genre: ["Sci-Fi", "Action"],
  rating: 8.8,
  thumbnail: "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
  duration: 148,
  description: "A thief who steals corporate secrets...",
  cast: ["Leonardo DiCaprio"],
  watchProgress: 45,
};

const mockSaveProgress = vi.fn();

vi.mock("@/hooks/useWatchHistory", () => ({
  useWatchHistory: () => ({
    history: {
      [mockMovie.id]: { progress: 10 },
    },
    saveProgress: mockSaveProgress,
  }),
}));

describe("MovieModal Component", () => {
  it("should render movie details correctly", () => {
    render(<MovieModal movie={mockMovie} isOpen={true} onClose={() => {}} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(/Continue \(10%\)/i)).toBeInTheDocument();
  });

  it("should call saveProgress with incremented value on click", () => {
    render(<MovieModal movie={mockMovie} isOpen={true} onClose={() => {}} />);

    const playButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(playButton);

    expect(mockSaveProgress).toHaveBeenCalledWith(mockMovie.id, 15);
  });

  it("should call onClose when Esc key is pressed", () => {
    const mockOnClose = vi.fn();
    render(
      <MovieModal movie={mockMovie} isOpen={true} onClose={mockOnClose} />,
    );

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
