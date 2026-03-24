import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: () => vi.fn(),
}));

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn().mockResolvedValue({}) },
}));

import { useLocation } from "react-router-dom";
import Success from "./Success";

const arbCartItem = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 50 }),
  cover: fc.constant("cover.jpg"),
  ebookPrice: fc.integer({ min: 100, max: 9999 }),
  quantity: fc.integer({ min: 1, max: 5 }),
  pdf: fc.option(fc.constant("/pdfs/test.pdf"), { nil: null }),
});

describe("Property 7: Success page renders a download link for each ebook in purchasedBooks", () => {
  it("Feature: book-store-enhancement, Property 7 — Validates: Requirements 12.1, 12.2", () => {
    fc.assert(
      fc.property(
        fc.array(arbCartItem, { minLength: 0, maxLength: 8 }),
        (purchasedBooks) => {
          useLocation.mockReturnValue({
            state: { purchasedBooks, email: "test@example.com", fullname: "Test User" },
          });

          const { unmount } = render(<Success />);

          const expectedDownloads = purchasedBooks.filter(item => item.pdf).length;
          const downloadLinks = screen.queryAllByRole("link", { name: /download/i });
          expect(downloadLinks.length).toBe(expectedDownloads);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
