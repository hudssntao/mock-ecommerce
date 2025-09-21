import { Product } from "../src/entities/Product";
import { getEM, getORM } from "../src/lib/orm";

const sampleProducts = [
  {
    name: 'MacBook Pro 16"',
    description:
      "Apple MacBook Pro 16-inch with M2 Pro chip, 16GB RAM, and 512GB SSD. Perfect for professional work and creative tasks.",
    price: 2499.99,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
  },
  {
    name: "iPhone 15 Pro",
    description:
      "Latest iPhone 15 Pro with titanium design, A17 Pro chip, and advanced camera system. Available in natural titanium.",
    price: 999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
  },
  {
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.",
    price: 399.99,
    imageUrl:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
  },
  {
    name: "Samsung 4K Monitor",
    description:
      "32-inch 4K UHD curved monitor with HDR support, perfect for gaming and professional work. USB-C connectivity included.",
    price: 549.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
  },
  {
    name: "Mechanical Keyboard",
    description:
      "Premium mechanical keyboard with Cherry MX switches, RGB backlighting, and programmable keys for ultimate typing experience.",
    price: 159.99,
    imageUrl:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
  },
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking, customizable buttons, and long-lasting battery. Perfect for productivity.",
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
  },
  {
    name: "iPad Air",
    description:
      "Powerful and versatile iPad Air with M1 chip, 10.9-inch Liquid Retina display, and support for Apple Pencil.",
    price: 599.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
  },
  {
    name: "AirPods Pro",
    description:
      "Active noise cancellation meets personalized spatial audio. Adaptive transparency and customizable fit for all-day comfort.",
    price: 249.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
  },
  {
    name: "Gaming Chair",
    description:
      "Ergonomic gaming chair with lumbar support, adjustable armrests, and premium PU leather. Built for long gaming sessions.",
    price: 299.99,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
  },
  {
    name: "Webcam 4K",
    description:
      "Ultra HD 4K webcam with auto-focus, noise reduction, and wide-angle lens. Perfect for streaming and video calls.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
  },
  {
    name: "Portable SSD 1TB",
    description:
      "Ultra-fast portable SSD with 1TB storage, USB 3.2 connectivity, and compact design. Perfect for backup and file transfer.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
  },
  {
    name: "Smartphone Stand",
    description:
      "Adjustable aluminum smartphone stand with anti-slip base. Compatible with all phone sizes and tablets.",
    price: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery life. Perfect for outdoor use.",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
  },
  {
    name: "USB-C Hub",
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Essential for modern laptops.",
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop",
  },
  {
    name: "Desk Lamp LED",
    description:
      "Adjustable LED desk lamp with multiple brightness levels, color temperature control, and USB charging port.",
    price: 69.99,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
];

async function seedDatabase() {
  console.log("[seed] Starting database seeding...");

  try {
    const em = await getEM();

    const existingProductCount = await em.count(Product);
    if (existingProductCount > 0) {
      console.log(
        `[seed] Database already contains ${existingProductCount} products. Skipping seeding.`
      );
      console.log("[seed] To re-seed, clear the products table first.");
      return;
    }

    console.log("[seed] Creating products...");

    const products = sampleProducts.map((productData) => {
      const product = new Product();
      product.name = productData.name;
      product.description = productData.description;
      product.price = productData.price;
      product.imageUrl = productData.imageUrl;
      return product;
    });

    products.forEach((product) => em.persist(product));
    await em.flush();

    console.log(
      `[seed] Successfully seeded database with ${products.length} products!`
    );

    console.log("[seed] Seeded products:");
    products.forEach((product, index) => {
      console.log(`[seed] ${index + 1}. ${product.name} - $${product.price}`);
    });
  } catch (error) {
    console.error("[seed] Error seeding database:", error);
    throw error;
  } finally {
    const orm = await getORM();
    await orm.close();
    console.log("[seed] Database connection closed.");
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("[seed] Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[seed] Seeding failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };
