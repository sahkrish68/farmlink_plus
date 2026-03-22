const BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace(/\/$/, "");

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fl_token");
}

interface RequestOptions {
  method?: string;
  body?: object | FormData;
  auth?: boolean;
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = opts;
  const headers: Record<string, string> = {};

  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch failed:", error);
    console.error("Tried URL:", url);
    throw new Error(`Cannot connect to backend server: ${url}`);
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error((data as any).message || `Request failed with status ${res.status}`);
  }

  return data;
}

export type Role = "farmer" | "restaurant" | "industrial" | "customer" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  city?: string;
  address?: string;
  avatar?: string;
  status?: string;
  businessName?: string;
  businessType?: string;
  operatingHours?: string;
  preferredContact?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  productType?: string;
  description?: string;
  image?: string;
  quantityAvailable: number;
  unit: string;
  price: number;
  minOrderQuantity?: number;
  stockStatus?: string;
  deliveryOption?: string;
  deliveryArea?: string;
  expiryDate?: string;
  city?: string;
  sellerId?: string;
  sellerName?: string;
  sellerRole?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product?: Product;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  seller?: User;
}

export interface Order {
  _id: string;
  buyer: User;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress?: { city: string; address: string; phone: string };
  notes?: string;
  createdAt?: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  _id: string;
  sender: User;
  receiver: User;
  text: string;
  read: boolean;
  createdAt: string;
}

export interface MessageThread {
  partner: User;
  lastMessage: Message;
  unread: number;
}

const safeRole = (role: any): Role => {
  if (
    role === "farmer" ||
    role === "restaurant" ||
    role === "industrial" ||
    role === "customer" ||
    role === "admin"
  ) {
    return role;
  }
  return "customer";
};

export function getImageUrl(image?: string) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `http://localhost:5001${image}`;
}

export function isDirectImageUrl(url?: string) {
  if (!url) return false;
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(url);
}

export const authApi = {
  register: (body: any) =>
    request<{ token: string; user: User; message: string }>("/auth/register", {
      method: "POST",
      body,
      auth: false,
    }),

  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body,
      auth: false,
    }),

  me: () => request<{ user: User }>("/auth/me"),
};

export const userApi = {
  getProfile: () => request<{ user: User }>("/users/profile"),
  updateProfile: (body: Partial<User>) =>
    request<{ message: string; user: User }>("/users/profile", {
      method: "PUT",
      body,
    }),
  changePassword: (body: { currentPassword: string; newPassword: string }) =>
    request<{ message: string }>("/users/password", {
      method: "PUT",
      body,
    }),
  uploadAvatar: (form: FormData) =>
    request<{ message: string; avatar: string }>("/users/avatar", {
      method: "POST",
      body: form,
    }),
};

export const productApi = {
  list: async (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : "";
    const res = await request<{ products: any[]; total: number; pages: number }>(`/products${q}`, {
      auth: false,
    });

    return {
      products: (res.products || []).map((p) => ({
        _id: String(p.id ?? p._id),
        name: p.name,
        slug: p.slug,
        category: p.category,
        productType: p.product_type ?? p.productType,
        description: p.description,
        image: p.image,
        quantityAvailable: Number(p.available_quantity ?? p.quantity_available ?? p.quantityAvailable ?? 0),
        unit: p.unit,
        price: Number(p.price ?? 0),
        minOrderQuantity: Number(p.min_order_quantity ?? p.minOrderQuantity ?? 0),
        stockStatus: p.stock_status ?? p.stockStatus,
        deliveryOption: p.delivery_option ?? p.deliveryOption,
        deliveryArea: p.delivery_area ?? p.deliveryArea,
        expiryDate: p.expiry_date ?? p.expiryDate,
        city: p.city,
        sellerId: String(p.seller_id ?? p.sellerId ?? ""),
        sellerName: p.seller_name ?? p.sellerName,
        sellerRole: p.seller_role ?? p.sellerRole,
        isActive: p.is_active ?? p.isActive,
        createdAt: p.created_at ?? p.createdAt,
      })),
      total: Number(res.total || 0),
      pages: Number(res.pages || 1),
    };
  },

  mine: async () => {
    const res = await request<{ products: any[]; total: number; pages: number }>(`/products?mine=true`);
    return {
      products: (res.products || []).map((p) => ({
        _id: String(p.id ?? p._id),
        name: p.name,
        slug: p.slug,
        category: p.category,
        productType: p.product_type ?? p.productType,
        description: p.description,
        image: p.image,
        quantityAvailable: Number(p.available_quantity ?? p.quantity_available ?? p.quantityAvailable ?? 0),
        unit: p.unit,
        price: Number(p.price ?? 0),
        minOrderQuantity: Number(p.min_order_quantity ?? p.minOrderQuantity ?? 0),
        stockStatus: p.stock_status ?? p.stockStatus,
        deliveryOption: p.delivery_option ?? p.deliveryOption,
        deliveryArea: p.delivery_area ?? p.deliveryArea,
        expiryDate: p.expiry_date ?? p.expiryDate,
        city: p.city,
        sellerId: String(p.seller_id ?? p.sellerId ?? ""),
        sellerName: p.seller_name ?? p.sellerName,
        sellerRole: p.seller_role ?? p.sellerRole,
        isActive: p.is_active ?? p.isActive,
        createdAt: p.created_at ?? p.createdAt,
      })),
      total: Number(res.total || 0),
      pages: Number(res.pages || 1),
    };
  },

  get: async (slug: string) => {
    const res = await request<{ product: any }>(`/products/${slug}`, { auth: false });

    return {
      product: {
        _id: String(res.product.id ?? res.product._id),
        name: res.product.name,
        slug: res.product.slug,
        category: res.product.category,
        productType: res.product.product_type ?? res.product.productType,
        description: res.product.description,
        image: res.product.image,
        quantityAvailable: Number(res.product.available_quantity ?? res.product.quantity_available ?? res.product.quantityAvailable ?? 0),
        unit: res.product.unit,
        price: Number(res.product.price ?? 0),
        minOrderQuantity: Number(res.product.min_order_quantity ?? res.product.minOrderQuantity ?? 0),
        stockStatus: res.product.stock_status ?? res.product.stockStatus,
        deliveryOption: res.product.delivery_option ?? res.product.deliveryOption,
        deliveryArea: res.product.delivery_area ?? res.product.deliveryArea,
        expiryDate: res.product.expiry_date ?? res.product.expiryDate,
        city: res.product.city,
        sellerId: String(res.product.seller_id ?? res.product.sellerId ?? ""),
        sellerName: res.product.seller_name ?? res.product.sellerName,
        sellerRole: res.product.seller_role ?? res.product.sellerRole,
        isActive: res.product.is_active ?? res.product.isActive,
        createdAt: res.product.created_at ?? res.product.createdAt,
      },
    };
  },

  create: (form: FormData) =>
    request<{ message: string; product: Product }>("/products", {
      method: "POST",
      body: form,
    }),

  update: (id: string, form: FormData) =>
    request<{ message: string }>(`/products/${id}`, {
      method: "PUT",
      body: form,
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/products/${id}`, {
      method: "DELETE",
    }),
};

export const farmerApi = {
  list: async (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    const res = await request<{ farmers: any[]; total: number }>(`/farmers${q}`, {
      auth: false,
    });

    return {
      farmers: (res.farmers || []).map((f) => ({
        _id: String(f.id),
        name: f.full_name,
        email: f.email,
        phone: f.phone,
        city: f.city,
        address: f.address,
        businessName: f.business_name,
        businessType: f.business_type,
        avatar: f.avatar,
        createdAt: f.created_at,
        role: "farmer" as Role,
      })),
      total: Number(res.total || 0),
    };
  },

  get: async (id: string) => {
    const res = await request<{ farmer: any; products: any[] }>(`/farmers/${id}`, {
      auth: false,
    });

    return {
      farmer: {
        _id: String(res.farmer.id),
        name: res.farmer.full_name,
        email: res.farmer.email,
        phone: res.farmer.phone,
        city: res.farmer.city,
        address: res.farmer.address,
        businessName: res.farmer.business_name,
        businessType: res.farmer.business_type,
        avatar: res.farmer.avatar,
        createdAt: res.farmer.created_at,
        role: "farmer" as Role,
      },
      products: res.products || [],
    };
  },
};

export const cartApi = {
  get: async () => {
    const res = await request<{ items: any[]; total: number }>("/cart");

    return {
      items: (res.items || []).map((item) => ({
        product: {
          _id: String(item.product?.id ?? item.product?._id ?? item.product_id ?? item.id),
          name: item.product?.name ?? item.name ?? "Unnamed product",
          slug: item.product?.slug ?? item.slug ?? "",
          category: item.product?.category ?? item.category ?? "",
          productType: item.product?.product_type ?? item.product?.productType ?? item.product_type ?? "",
          description: item.product?.description ?? item.description ?? "",
          image: item.product?.image ?? item.image ?? "",
          quantityAvailable: Number(
            item.product?.available_quantity ??
              item.product?.quantity_available ??
              item.product?.quantityAvailable ??
              item.available_quantity ??
              item.quantity_available ??
              0
          ),
          unit: item.product?.unit ?? item.unit ?? "",
          price: Number(item.product?.price ?? item.price ?? 0),
          sellerId: String(item.product?.seller_id ?? item.product?.sellerId ?? item.seller_id ?? ""),
          sellerName: item.product?.seller_name ?? item.product?.sellerName ?? item.seller_name ?? "",
          sellerRole: item.product?.seller_role ?? item.product?.sellerRole ?? item.seller_role ?? "",
          isActive: item.product?.is_active ?? item.product?.isActive ?? true,
          createdAt: item.product?.created_at ?? item.product?.createdAt ?? item.created_at ?? "",
        },
        quantity: Number(item.quantity ?? 1),
      })),
      total: Number(res.total || 0),
    };
  },

  add: (productId: string, quantity = 1) =>
    request<{ message: string }>("/cart", {
      method: "POST",
      body: { productId, quantity },
    }),

  update: (productId: string, quantity: number) =>
    request<{ message: string }>(`/cart/${productId}`, {
      method: "PUT",
      body: { quantity },
    }),

  remove: (productId: string) =>
    request<{ message: string }>(`/cart/${productId}`, {
      method: "DELETE",
    }),

  clear: () =>
    request<{ message: string }>("/cart", {
      method: "DELETE",
    }),
};

export const wishlistApi = {
  get: () => request<{ products: Product[] }>("/wishlist"),
  toggle: (productId: string) =>
    request<{ action: string; count: number }>(`/wishlist/${productId}`, {
      method: "POST",
    }),
  clear: () =>
    request<{ message: string }>("/wishlist", {
      method: "DELETE",
    }),
};

export const orderApi = {
  place: (body: {
    items: { productId: string; quantity: number }[];
    shippingAddress?: { city: string; address: string; phone: string };
    notes?: string;
  }) =>
    request<{ message: string; order: any }>("/orders", {
      method: "POST",
      body,
    }),

  list: async (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    const res = await request<{ orders: any[]; total: number }>(`/orders${q}`);

    return {
      orders: (res.orders || []).map((o) => ({
        _id: String(o.id ?? o._id),
        buyer: o.buyer
          ? {
              _id: String(o.buyer.id ?? o.buyer._id ?? ""),
              name: o.buyer.full_name ?? o.buyer.name ?? "Unknown buyer",
              email: o.buyer.email ?? "",
              phone: o.buyer.phone,
              role: safeRole(o.buyer.role),
              city: o.buyer.city,
              address: o.buyer.address,
            }
          : {
              _id: String(o.buyer_id ?? ""),
              name: o.buyer_name ?? "Unknown buyer",
              email: "",
              role: "customer" as Role,
            },
        items: o.items || [],
        totalAmount: Number(o.total_amount ?? o.totalAmount ?? 0),
        status: o.status,
        shippingAddress: o.shipping_address ?? o.shippingAddress,
        notes: o.notes,
        createdAt: o.created_at ?? o.createdAt,
      })),
      total: Number(res.total || 0),
    };
  },

  get: async (id: string) => {
    const res = await request<{ order: any }>(`/orders/${id}`);
    const o = res.order;

    return {
      order: {
        _id: String(o.id ?? o._id),
        buyer: o.buyer
          ? {
              _id: String(o.buyer.id ?? o.buyer._id ?? ""),
              name: o.buyer.full_name ?? o.buyer.name ?? "Unknown buyer",
              email: o.buyer.email ?? "",
              phone: o.buyer.phone,
              role: safeRole(o.buyer.role),
              city: o.buyer.city,
              address: o.buyer.address,
            }
          : {
              _id: String(o.buyer_id ?? ""),
              name: o.buyer_name ?? "Unknown buyer",
              email: "",
              role: "customer" as Role,
            },
        items: o.items || [],
        totalAmount: Number(o.total_amount ?? o.totalAmount ?? 0),
        status: o.status,
        shippingAddress: o.shipping_address ?? o.shippingAddress,
        notes: o.notes,
        createdAt: o.created_at ?? o.createdAt,
      },
    };
  },

  updateStatus: (id: string, status: string) =>
    request<{ message: string }>(`/orders/${id}/status`, {
      method: "PUT",
      body: { status },
    }),

  cancel: (id: string) =>
    request<{ message: string }>(`/orders/${id}`, {
      method: "DELETE",
    }),
};

export const notificationApi = {
  list: async () => {
    const res = await request<{ notifications: any[] }>("/notifications");

    return {
      notifications: (res.notifications || []).map((n, index) => ({
        _id: String(n.id ?? n._id ?? `${index}`),
        title: n.title ?? "Notification",
        message: n.message ?? "",
        type: n.type ?? "general",
        isRead: Boolean(n.is_read ?? n.isRead ?? false),
        createdAt: n.created_at ?? n.createdAt ?? "",
      })),
    };
  },

  read: (id: string) =>
    request<{ message: string }>(`/notifications/${id}/read`, {
      method: "PUT",
    }),
};

export const chatbotApi = {
  ask: (message: string) =>
    request<{ reply: string; suggestions?: string[] }>("/chatbot", {
      method: "POST",
      body: { message },
    }),
};

export const messageApi = {
  inbox: () => request<{ threads: MessageThread[] }>("/messages/inbox"),
  thread: (userId: string) =>
    request<{ messages: Message[] }>(`/messages/thread/${userId}`),
  send: (body: { receiverId: string; text: string; productId?: string }) =>
    request<{ message: string }>("/messages", {
      method: "POST",
      body,
    }),
  unreadCount: () => request<{ count: number }>("/messages/unread-count"),
};

export const adminApi = {
  stats: () => request<any>("/admin/stats"),
  users: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<any>(`/admin/users${q}`);
  },
  updateUser: (id: string, body: object) =>
    request<any>(`/admin/users/${id}`, {
      method: "PUT",
      body,
    }),
  deactivateUser: (id: string) =>
    request<any>(`/admin/users/${id}`, {
      method: "DELETE",
    }),
  orders: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<any>(`/admin/orders${q}`);
  },
};

export function saveSession(token: string, user: User) {
  localStorage.setItem("fl_token", token);
  localStorage.setItem("fl_user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-changed"));
}

export function clearSession() {
  localStorage.removeItem("fl_token");
  localStorage.removeItem("fl_user");
  window.dispatchEvent(new Event("auth-changed"));
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("fl_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}