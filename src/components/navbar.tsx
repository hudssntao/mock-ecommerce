"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks";

/**
 * Navigation bar component displayed at the top of all pages.
 * 
 * Features the application logo, brand name, and cart indicator with item count.
 * Provides navigation back to the homepage and visual feedback for cart state
 * including loading states and item counts.
 * 
 * @returns JSX element representing the navigation bar
 * 
 * @example
 * ```typescript
 * // In layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <TRPCReactProvider>
 *           <CartProvider>
 *             <Navbar />
 *             {children}
 *           </CartProvider>
 *         </TRPCReactProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 * 
 * @features
 * - Responsive design (1024px max width)
 * - Logo and brand name linking to homepage
 * - Cart icon with dynamic item count badge
 * - Loading state indicator for cart operations
 * - Visual feedback for empty/populated cart states
 */
export default function Navbar() {
  const { state } = useCart();

  const shouldShowLoading = state.isLoading;
  const shouldShowCount = state.totalItems > 0 && !state.isLoading;

  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-[1024px] h-16 flex justify-between items-center opacity-100 border-b border-primary pt-0 pr-6 pb-0 pl-[17px]">
        <Link href="/">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-[32px] h-[32px] p-[7px]">
              <Image
                src="/img/logo.svg"
                alt="Not Amazon Logo"
                width={24}
                height={24}
                className="text-white"
              />
            </div>
            <span className="font-sans font-semibold text-base leading-normal tracking-wide align-middle">
              Not Amazon
            </span>
          </div>
        </Link>

        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-center relative w-[32px] h-[32px] rounded-lg transition-colors cursor-pointer"
          >
            <Image
              src="/img/shopping-bag.svg"
              alt="Shopping Cart"
              width={18}
              height={20}
              className="text-white"
            />
            {shouldShowCount && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {state.totalItems}
              </span>
            )}
            {shouldShowLoading && (
              <span className="absolute -top-1 -right-1 bg-gray-50 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-b border-gray-700"></div>
    </div>
  );
}
