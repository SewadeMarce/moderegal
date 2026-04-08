export type Product = {
  id: string;
      name: string;
      slug: string;
      description: string;
      price: number;
      category_id: string;
      image_url: string;
      stock: number;
      is_new: boolean;
      is_promo: boolean;
      discount_price: string | null;
      created_at: string;
      updated_at: string;
      images_url: string[];
      size: string[];
      color: string[];
      category: string
};

export type Products = Product[];

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type CategoriesType = Category[];


export type ProductCart = { name: string; price: number; image_url?: string | null;size?: string; color?: string;  };
export type CartItemType = { id: string; quantity: number; product_id: string;  } & ProductCart;