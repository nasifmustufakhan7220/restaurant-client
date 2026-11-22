// একটা menu item-এর ডেটা কেমন হবে তার নকশা
export interface MenuItem {
  _id: string; // MongoDB-র id (string আকারে আসে)
  name: string;
  category: string;
  price: number;
  location: string;
  vendor: string;
  image: string;
  priority?: boolean; // ঐচ্ছিক: যদি priority থাকে, তাহলে true হবে, না থাকলে undefined
}

// একটা category card-এর ডেটা
export interface Category {
  name: string;
  icon: string;
  description: string;
}