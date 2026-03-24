# Requirements Document

## Introduction

This document defines the requirements for enhancing the Consulate Books e-commerce website. The enhancements include a new design system, a full cart system with multi-book checkout, an announcement bar, and redesigned pages for Home, Book Details, Checkout, and Success. All existing single-book checkout flows, Paystack payment integration, and EmailJS notification logic must remain intact.

## Glossary

- **Cart**: A global client-side collection of ebook items a user intends to purchase together.
- **CartContext**: A React Context that provides cart state and actions to all components.
- **CartSidebar**: A slide-in panel from the right that displays cart contents and checkout controls.
- **AnnouncementBar**: A dismissible sticky bar displayed above the Navbar.
- **BookCard**: A UI card component representing a single book on the Home page.
- **DesignSystem**: The set of Tailwind CSS tokens (colors, fonts, shadows, animations) applied consistently across the app.
- **CartCheckout**: The multi-book checkout flow accessed via `/checkout/cart`.
- **SingleCheckout**: The existing per-book checkout flow accessed via `/checkout/:id`.
- **ToastNotification**: A brief, auto-dismissing UI message confirming a cart action.
- **Paystack**: The third-party payment processor used for all transactions.
- **EmailJS**: The third-party email service used to send purchase confirmations.

---

## Requirements

### Requirement 1: Design System Update

**User Story:** As a developer, I want a consistent design system applied across the app, so that the UI is visually cohesive and maintainable.

#### Acceptance Criteria

1. THE DesignSystem SHALL define the following color tokens in the Tailwind config: `primary` (#1F3A5F), `azure` (#007FFF), `accent` (#F59E0B), `bg` (#F8FAFC), `card` (#FFFFFF), `heading` (#0F172A), `body` (#F5F7FA).
2. THE DesignSystem SHALL load Poppins (headings) and Inter (body) fonts via Google Fonts in `index.html`.
3. THE DesignSystem SHALL define custom Tailwind utilities: `shadow-soft` and `shadow-card`.
4. THE DesignSystem SHALL define custom Tailwind animations: `animate-fadeInUp`, `animate-fadeInDown`, `animate-fadeInLeft`, `animate-fadeInRight`, `animate-fadeIn`, and `animate-float`.
5. WHEN the design system is applied, THE App SHALL use `font-poppins` for all heading elements and `font-inter` for all body text.

---

### Requirement 2: Cart State Management

**User Story:** As a shopper, I want my cart to persist across all pages, so that I can browse and add books without losing my selections.

#### Acceptance Criteria

1. THE CartContext SHALL expose: `cartItems` (array), `addToCart(book)`, `removeFromCart(bookId)`, `updateQuantity(bookId, delta)`, `clearCart()`, and `cartCount` (total item count).
2. WHEN `addToCart` is called with a book already in the cart, THE CartContext SHALL increment that book's quantity by 1.
3. WHEN `addToCart` is called with a new book, THE CartContext SHALL add it to `cartItems` with quantity 1.
4. WHEN `updateQuantity` is called with a delta that would reduce quantity below 1, THE CartContext SHALL remove the item from the cart.
5. THE CartContext SHALL be provided at the root level so all pages and components can access cart state.
6. WHEN `clearCart` is called, THE CartContext SHALL set `cartItems` to an empty array.

---

### Requirement 3: Announcement Bar

**User Story:** As a site visitor, I want to see a notice about the multi-book cart feature, so that I know I can add multiple books and pay once.

#### Acceptance Criteria

1. THE AnnouncementBar SHALL display the text: "You can now add multiple books to your cart and pay once."
2. THE AnnouncementBar SHALL be rendered above the Navbar and remain sticky at the top of the viewport.
3. WHEN a user clicks the close (X) button, THE AnnouncementBar SHALL hide and not reappear during the same browser session.
4. THE AnnouncementBar SHALL use an azure or primary color background with white text.
5. WHEN the AnnouncementBar is dismissed, THE Navbar SHALL shift up to occupy the top position.

---

### Requirement 4: Navbar Cart Icon

**User Story:** As a shopper, I want to see a cart icon in the navbar with a live item count, so that I always know how many items are in my cart.

#### Acceptance Criteria

1. THE Navbar SHALL display a cart icon (shopping cart) in the top-right area.
2. WHEN `cartCount` is greater than 0, THE Navbar SHALL display a badge showing the count with an azure background and white text.
3. WHEN `cartCount` is 0, THE Navbar SHALL hide the badge.
4. WHEN an item is added to the cart, THE badge SHALL play a scale/pop animation.
5. WHEN the cart icon is clicked, THE CartSidebar SHALL open.

---

### Requirement 5: Cart Sidebar

**User Story:** As a shopper, I want to view and manage my cart in a sidebar, so that I can review items, adjust quantities, and proceed to checkout without leaving the current page.

#### Acceptance Criteria

1. THE CartSidebar SHALL slide in from the right side of the viewport when opened.
2. THE CartSidebar SHALL display each cart item with: book cover image, title, unit price, and quantity controls (+ and − buttons).
3. THE CartSidebar SHALL display a remove button for each cart item.
4. WHEN the − button is clicked and quantity is 1, THE CartSidebar SHALL remove the item from the cart.
5. THE CartSidebar SHALL display the subtotal of all cart items.
6. WHEN the cart is empty, THE CartSidebar SHALL display an empty state message.
7. THE CartSidebar SHALL include a "Checkout" button that navigates to `/checkout/cart`.
8. WHEN the overlay or a close button is clicked, THE CartSidebar SHALL close.

---

### Requirement 6: Add to Cart on BookCard

**User Story:** As a shopper, I want to add ebooks to my cart directly from the book listing, so that I can quickly build my order.

#### Acceptance Criteria

1. WHEN a BookCard represents a book with an ebook price, THE BookCard SHALL display an "Add to Cart" button alongside the "View Book" button.
2. WHEN the "Add to Cart" button is clicked, THE CartContext SHALL add the book to the cart.
3. WHEN the "Add to Cart" button is clicked, THE App SHALL display a ToastNotification with the message "Book added to cart ✓".
4. WHEN a BookCard represents a book without an ebook price, THE BookCard SHALL NOT display an "Add to Cart" button.
5. THE ToastNotification SHALL auto-dismiss after 3 seconds.

---

### Requirement 7: Add to Cart on Book Details Page

**User Story:** As a shopper, I want to add a book to my cart from the Book Details page, so that I have a consistent cart experience across the site.

#### Acceptance Criteria

1. WHEN a book has an ebook price, THE BookDetails page SHALL display an "Add to Cart" button.
2. WHEN the "Add to Cart" button is clicked on BookDetails, THE CartContext SHALL add the book to the cart.
3. WHEN the "Add to Cart" button is clicked on BookDetails, THE App SHALL display a ToastNotification with the message "Book added to cart ✓".
4. THE BookDetails page SHALL retain the existing "Buy Now" button that navigates to `/checkout/:id`.
5. WHEN a book has an Amazon link, THE BookDetails page SHALL retain the "Buy Hardcopy on Amazon" button.

---

### Requirement 8: Homepage Redesign

**User Story:** As a site visitor, I want a visually appealing homepage with a clear book grid, so that I can easily browse and discover books.

#### Acceptance Criteria

1. THE Home page SHALL display books in a responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop.
2. WHEN a BookCard is rendered, THE BookCard SHALL display: book cover with hover zoom, title, short description (max 2 lines, truncated with ellipsis), ebook price with discount badge, "View Book" button, and "Add to Cart" button (if ebook available).
3. THE BookCard SHALL use `bg-card`, `shadow-card`, `rounded-2xl` styling.
4. WHEN a BookCard is hovered, THE BookCard SHALL apply `scale-105` and `shadow-soft` transitions.
5. WHEN BookCards are rendered, THE BookCard SHALL apply `animate-fadeInUp` entrance animation.
6. THE Home page SHALL retain the publisher intro section and author bio section.

---

### Requirement 9: Book Details Page Redesign

**User Story:** As a shopper, I want an immersive book detail view, so that I can read about the book and make a purchase decision.

#### Acceptance Criteria

1. THE BookDetails page SHALL use a two-column layout on desktop: left column for the book cover image, right column for title, description, price, and action buttons.
2. THE BookDetails page SHALL apply `animate-fadeInLeft` to the book cover image.
3. THE BookDetails page SHALL apply `animate-fadeInRight` to the content column.
4. THE BookDetails page SHALL apply `animate-float` to the book cover image.
5. THE BookDetails page SHALL display the ebook discounted price and original price with a discount percentage badge.

---

### Requirement 10: Multi-Book Cart Checkout

**User Story:** As a shopper, I want to check out all books in my cart in a single transaction, so that I only pay once for multiple books.

#### Acceptance Criteria

1. THE App SHALL register a `/checkout/cart` route that renders the CartCheckout page.
2. THE CartCheckout page SHALL display a two-column layout: left 65% for the customer form, right 35% for the order summary.
3. THE CartCheckout page SHALL display all cart items in the order summary with title, cover, and price.
4. THE CartCheckout page SHALL display the total amount of all cart items combined.
5. WHEN the customer submits the form, THE CartCheckout page SHALL initiate a Paystack payment for the combined total.
6. WHEN payment succeeds, THE CartCheckout page SHALL send an EmailJS notification for each book in the cart to the buyer's email.
7. WHEN payment succeeds, THE CartCheckout page SHALL send an EmailJS admin notification listing all purchased books.
8. WHEN payment succeeds, THE App SHALL navigate to the Success page with all purchased book data.
9. IF the cart is empty when `/checkout/cart` is visited, THEN THE CartCheckout page SHALL redirect to the home page.
10. THE CartCheckout page SHALL collect: email (required), and optionally full name, phone, address for hardcopy items.

---

### Requirement 11: Existing Single-Book Checkout Preserved

**User Story:** As a shopper, I want the existing single-book checkout to continue working, so that I can still buy individual books directly.

#### Acceptance Criteria

1. THE SingleCheckout page at `/checkout/:id` SHALL continue to function exactly as before.
2. THE SingleCheckout page SHALL retain all existing Paystack payment logic.
3. THE SingleCheckout page SHALL retain all existing EmailJS notification logic.
4. THE SingleCheckout page SHALL retain the delivery fee calculation for hardcopy purchases.
5. WHEN a user navigates to `/checkout/:id`, THE App SHALL render the SingleCheckout page without any regression.

---

### Requirement 12: Success Page Update

**User Story:** As a shopper, I want the success page to show all the books I purchased, so that I can download all my ebooks in one place.

#### Acceptance Criteria

1. WHEN navigated from a CartCheckout payment, THE Success page SHALL display all purchased books.
2. FOR EACH ebook in the purchased books list, THE Success page SHALL display a download link.
3. WHEN navigated from a SingleCheckout payment, THE Success page SHALL continue to display the single purchased book as before.
4. THE Success page SHALL display the buyer's email address.
5. THE Success page SHALL include a "Back to Home" link.
