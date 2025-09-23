/**
 * Product components barrel export file.
 * 
 * Provides convenient imports for all product-related components.
 * This allows importing multiple components from a single location
 * and keeps import statements clean and organized.
 * 
 * @example
 * ```typescript
 * // Instead of multiple imports:
 * import FeaturedProduct from "./components/product/featured-product";
 * import ProductCard from "./components/product/product-card";
 * import ProductFeed from "./components/product/product-feed";
 * 
 * // Use barrel import:
 * import { FeaturedProduct, ProductCard, ProductFeed } from "./components/product";
 * ```
 * 
 * @exports FeaturedProduct - Daily featured product display component
 * @exports ProductCard - Individual product card component with cart actions
 * @exports ProductFeed - Infinite scroll product grid component
 */
export { default as FeaturedProduct } from "./featured-product";
export { default as ProductCard } from "./product-card";
export { default as ProductFeed } from "./product-feed";
