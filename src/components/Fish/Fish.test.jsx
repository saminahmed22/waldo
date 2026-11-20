import { render, screen } from "@testing-library/react";

import Fish from "./Fish";

describe("Fish Componenet", () => {
  it("should render an image tag", () => {
    render(<Fish name="clown-fish" />);

    expect(screen.getByAltText("Image of clown-fish")).toBeInTheDocument();
  });
});
