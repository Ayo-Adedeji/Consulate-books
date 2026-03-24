# Implementation Plan: Book Store Enhancement

## Overview

Incremental implementation of the design system, cart system, UI redesigns, and multi-book checkout. Each task builds on the previous. The existing single-book checkout, Paystack, and EmailJS flows are never broken.

## Tasks

- [x] 1. Apply design system to Tailwind config and index.html
  - Update `tailwind.config.js` with new color tokens (primary, azure, accent, bg, card, heading, body), font families (poppins, inter), custom shadows (shadow-soft, shadow-card), keyframes and animations (fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeIn, float, badgePop)
  - Keep legacy color aliases (primaryHover, footerBg, footerText) to avoid breaking existing styles
  - Add Google Fonts link tags for Poppins and Inter in `index.html`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Implement CartContext
  - Create `src/context/CartContext.jsx` with `CartProvider` and `useCart` hook
  - State: `cartItems` array of `{ id, title, cover, ebookPrice, quantity }`
  - Implement `addToCart(book)`: if book exists increment quantity, else push with quantity 1
  - Implement `removeFromCart(bookId)`: filter out item
  - Implement `updateQuantity(bookId, delta)`: increment/decrement; remove if quantity drops to 0
  - Implement `clearCart()`: reset to empty array
  - Derive `cartCount` (sum of quantities) and `cartTotal` (sum of price * quantity)
  - Wrap app in `CartProvider` inside `src/App.jsx`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 2.1 Write property test: addToCart increments quantity for existing items
    - **Property 1: addToCart increments quantity for existing items**
    - **Validates: Requirements 2.2**
    - Use fast-check to generate random book objects and cart states; assert quantity increments by 1

  - [x] 2.2 Write property test: addToCart adds new book with quantity 1
    - **Property 2: addToCart adds new book with quantity 1**
    - **Validates: Requirements 2.3**
    - Generate random books not in cart; assert quantity is 1 after add

  - [x] 2.3 Write property test: updateQuantity removes item at quantity 0
    - **Property 3: updateQuantity removes item when quantity would drop below 1**
    - **Validates: Requirements 2.4**
    - Generate cart items with quantity 1; call updateQuantity(-1); assert item absent

  - [x] 2.4 Write property test: clearCart always empties cart
    - **Property 4: clearCart always produces an empty cart**
    - **Validates: Requirements 2.6**
    - Generate arbitrary cart states; call clearCart; assert cartItems is [] and cartCount is 0

  - [x] 2.5 Write property test: cartTotal equals sum of price times quantity
    - **Property 5: Cart total equals sum of price times quantity for all items**
    - **Validates: Requirements 5.5, 10.4**
    - Generate random cart item arrays; assert cartTotal equals manual sum

- [ ] 3. Implement AnnouncementBar component
  - Create `src/components/AnnouncementBar.jsx`
  - Display text: "You can now add multiple books to your cart and pay once."
  - Use azure background, white text, sticky positioning above Navbar
  - Dismiss state stored in `sessionStorage` key `announcementDismissed`
  - Render `null` when dismissed
  - Add `AnnouncementBar` above `<Navbar />` in `App.jsx`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4. Implement ToastNotification component
  - Create `src/components/ToastNotification.jsx`
  - Props: `message` (string), `visible` (bool), `onHide` callback
  - Fixed position (bottom-right), auto-dismiss after 3000ms via `useEffect`
  - Animate in/out with `animate-fadeIn`
  - Add toast state (`toastVisible`, `toastMessage`) to `App.jsx` and pass a `showToast(msg)` function down via a `ToastContext` or prop drilling through a wrapper
  - _Requirements: 6.3, 6.5_

- [x] 5. Implement CartSidebar component
  - Create `src/components/CartSidebar.jsx`
  - Props: `isOpen` (bool), `onClose` (() => void)
  - Consumes `useCart()`
  - Slide-in from right using CSS transform transition
  - Render each cart item: cover image, title, price, quantity controls (+ / − buttons), remove button
  - − button at quantity 1 calls `removeFromCart`
  - Display subtotal: sum of all `item.ebookPrice * item.quantity`
  - Empty state message when `cartItems.length === 0`
  - "Checkout" button navigates to `/checkout/cart`
  - Overlay click calls `onClose`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [x] 6. Update Navbar with cart icon and badge
  - Import `CartSidebar` and manage `sidebarOpen` state in `Navbar.jsx`
  - Add cart icon (react-icons `FiShoppingCart`) to top-right of navbar
  - Render badge with `cartCount` when `cartCount > 0`; hide when 0
  - Apply `animate-badgePop` class on badge when `cartCount` changes (use key prop trick or state flag)
  - Badge: azure background, white text, rounded-full
  - Render `<CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 6.1 Write property test: badge count reflects cartCount
    - **Property 8: Badge count reflects cartCount and is hidden when zero**
    - **Validates: Requirements 4.2, 4.3**
    - Render Navbar with various cartCount values; assert badge text equals count and is absent at 0

- [x] 7. Redesign BookCard component
  - Rewrite `src/components/BookCard.jsx` for grid card layout
  - Use `bg-card shadow-card rounded-2xl` container
  - Book cover: full-width top image with `overflow-hidden` and `hover:scale-110 transition-transform` on the `<img>`
  - Title: `font-poppins font-bold`
  - Short description: `line-clamp-2` (2-line truncation)
  - Price section: discounted price + strikethrough original + discount % badge (accent color)
  - "View Book" button: links to `/book/:id`
  - "Add to Cart" button: shown only when `book.prices?.ebook` exists; calls `addToCart(book)` and `showToast("Book added to cart ✓")`
  - Amazon-only books: show "Buy on Amazon" button, no Add to Cart
  - Card hover: `hover:scale-105 hover:shadow-soft transition-all`
  - Entrance: `animate-fadeInUp`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.2, 8.3, 8.4, 8.5_

  - [x] 7.1 Write property test: Add to Cart button visibility matches ebook price existence
    - **Property 6: Add to Cart button visibility matches ebook price existence**
    - **Validates: Requirements 6.1, 6.4**
    - Generate random book objects with and without ebook prices; render BookCard; assert button presence matches

- [x] 8. Redesign Home page
  - Update `src/pages/Home.jsx` book grid to use `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`
  - Remove the old list-style `BookCard` layout
  - Retain publisher intro section and author bio section with updated design system colors/fonts
  - _Requirements: 8.1, 8.6_

- [x] 9. Redesign Book Details page
  - Update `src/pages/BookDetails.jsx` to two-column layout: left (cover), right (content)
  - Left column: `animate-fadeInLeft` on image, `animate-float` on image
  - Right column: `animate-fadeInRight`
  - Display ebook discounted price, original price (strikethrough), discount % badge
  - Add "Add to Cart" button (calls `addToCart` + `showToast`) when ebook price exists
  - Retain "Buy Now" button → `/checkout/:id?type=ebook`
  - Retain "Buy Hardcopy on Amazon" button via `BuyButtons` or inline
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement CartCheckout page
  - Create `src/pages/CartCheckout.jsx`
  - On mount: if `cartItems.length === 0`, redirect to `/`
  - Two-column layout: left 65% (form), right 35% (order summary)
  - Order summary: list each cart item with cover, title, price; display combined total
  - Form fields: email (required); full name, phone, address (optional, for reference)
  - On submit: call `PaystackPop.setup` with combined `cartTotal * 100` as amount
  - On Paystack success callback:
    - Loop through `cartItems` and call `emailjs.send` buyer template for each book (with pdf link)
    - Call `emailjs.send` admin template once with all book titles and buyer info
    - Call `clearCart()`
    - Navigate to `/success` with `{ purchasedBooks: cartItems, email, fullname }`
  - On Paystack cancel: alert "Payment cancelled"
  - Register route `/checkout/cart` in `App.jsx` (add before `/checkout/:id` to avoid conflict)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10_

- [x] 12. Update Success page for multi-book support
  - Update `src/pages/Success.jsx` to detect navigation state shape
  - If state contains `purchasedBooks` array → render multi-book success view: list all books, download link per ebook
  - If state contains `bookId` → render existing single-book success view (no change to existing logic)
  - Retain buyer email display and "Back to Home" link in both modes
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [x] 12.1 Write property test: Success page renders download link for each ebook in purchasedBooks
    - **Property 7: Success page renders a download link for each ebook in purchasedBooks**
    - **Validates: Requirements 12.1, 12.2**
    - Generate random arrays of cart items with pdf fields; render Success; assert one download link per item with pdf

- [x] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- The `/checkout/cart` route must be registered before `/checkout/:id` in the router to prevent path conflicts
- All EmailJS service IDs, template IDs, and public keys remain unchanged from the existing implementation
- The `primaryHover`, `footerBg`, and `footerText` color aliases are kept in Tailwind config to avoid breaking existing component styles during migration
- Property tests use [fast-check](https://github.com/dubzzz/fast-check) with a minimum of 100 iterations each
