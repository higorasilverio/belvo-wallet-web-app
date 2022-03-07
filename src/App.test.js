import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app correctly", () => {
  render(<App />);
  const simpleText = screen.getByText(/Belvo Wallet/i);
  expect(simpleText).toBeInTheDocument();
});
