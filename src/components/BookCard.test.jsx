import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";

vi.mock("../context/CartContext", () => ({ useCart: vi.fn() }));
vi.mock("../context/ToastContext", () => ({ useToast: vi.fn() }));
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }) => children,
}));

import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import BookCard from "./BookCard";

const mockBook = (hasEbook) => ({
  id: "test-book",
  title: "Test Book",
  author: "Author",
  shortDescription: "A short description",
  cover: "cover.jpg",
  amazonLink: null,
  pdf: hasEbook ? "/pdfs/test.pdf" : undefined,
  prices: hasEbook
    ? { ebook: { original: 3500, discounted: 1000 } }
    : {},
});

describe("Property 6: Add to Cart button visibility matches ebook price existence", () => {
  it("Feature: book-store-enhancement, Property 6 — Validates: Requirements 6.1, 6.4", () => {
    useCart.mockReturnValue({ addToCart: vi.fn() });
    useToast.mockReturnValue({ showToast: vi.fn() });

    fc.assert(
      fc.property(fc.boolean(), (hasEbook) => {
        const book = mockBook(hasEbook);
        const { unmount } = render(<BookCard book={book} />);
        const btn = screen.queryByRole("button", { name: /add to cart/i });
        if (hasEbook) {
          expect(btn).not.toBeNull();
        } else {
          expect(btn).toBeNull();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
