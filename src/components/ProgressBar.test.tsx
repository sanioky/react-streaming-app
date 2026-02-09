import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar Component", () => {
  it("should display the correct label and progress percentage", () => {
    render(<ProgressBar progress={45} label="Watching" />);

    expect(screen.getByText("Watching")).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
  });

  it("should not render if progress is 0", () => {
    const { container } = render(<ProgressBar progress={0} />);

    expect(container.firstChild).toBeNull();
  });

  it("should have the correct width style based on progress value", () => {
    render(<ProgressBar progress={75} />);
    const progressBar = screen.getByRole("progressbar");

    expect(progressBar).toHaveStyle({ width: "75%" });
  });
});
