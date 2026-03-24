import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";

// Mock useCart
vi.mock("../context/CartContext", () => ({
  useCart: vi.fn(),
}));

// Mock CartSidebar to avoid router issues
vi.mock("./CartSidebar", () => ({
  default: () => null,
}));

// Mock react-router-dom Link/useNavigate if needed
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }) => children,
}));

import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

describe("Property 8: Badge count reflects cartCount and is hidden when zero", () => {
  it("Feature: book-store-enhancement, Property 8 — Validates: Requirements 4.2, 4.3", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 99 }), (cartCount) => {
        useCart.mockReturnValue({ cartCount });
        const { unmount } = render(<Navbar />);

        if (cartCount > 0) {
          const badge = screen.queryByText(String(cartCount));
          expect(badge).not.toBeNull();
        } else {
          // badge should not be present when count is 0
          const badge = screen.queryByText("0");
          expect(badge).toBeNull();
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
