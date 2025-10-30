import App from "@/App";
import { render } from "@testing-library/react";

test("renders app without crashing", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
});
