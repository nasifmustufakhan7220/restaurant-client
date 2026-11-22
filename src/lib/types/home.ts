// একটা menu item-এর ডেটা কেমন হবে তার নকশা
export interface MenuItem {
  _id: string; // MongoDB-র id (string আকারে আসে)
  name: string;
  category: string;
  location: string;
  vendor: string;
  priority?: boolean; // ঐচ্ছিক: যদি priority থাকে, তাহলে true হবে, না থাকলে undefined
  createdDate: string;
  description: string;
  images: string[];
  isAvailable: boolean;
  itemName: string;
  price: string;
  status: "Approved";
  vendorEmail: string;
  vendorId: string;
  vendorName: string;
}


// একটা category card-এর ডেটা
export interface Category {
  name: string;
  icon: string;
  description: string;
}
