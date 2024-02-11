export const PRODUCT_CATEGORIES = [
  {
    label: "Mobile",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/apple15.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/apple13.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/apple14.jpg",
      },
    ],
  },
  {
    label: "MacBook",
    value: "icons" as const,
    featured: [
      {
        name: "Mackbook Air",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/macbook1.webp",
      },
      {
        name: "Mackbook Pro",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/nav/icons/macbook1.webp",
      },
      {
        name: "Mackbook Pro 16inch",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/macbook1.webp",
      },
    ],
  },
];
