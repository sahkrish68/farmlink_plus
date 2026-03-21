module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/farmlink_plus_full_project/frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApi",
    ()=>adminApi,
    "authApi",
    ()=>authApi,
    "cartApi",
    ()=>cartApi,
    "chatbotApi",
    ()=>chatbotApi,
    "clearSession",
    ()=>clearSession,
    "farmerApi",
    ()=>farmerApi,
    "getImageUrl",
    ()=>getImageUrl,
    "getStoredUser",
    ()=>getStoredUser,
    "isDirectImageUrl",
    ()=>isDirectImageUrl,
    "messageApi",
    ()=>messageApi,
    "notificationApi",
    ()=>notificationApi,
    "orderApi",
    ()=>orderApi,
    "productApi",
    ()=>productApi,
    "saveSession",
    ()=>saveSession,
    "userApi",
    ()=>userApi,
    "wishlistApi",
    ()=>wishlistApi
]);
const BASE = (("TURBOPACK compile-time value", "http://localhost:5001/api") || "http://localhost:5001/api").replace(/\/$/, "");
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
async function request(path, opts = {}) {
    const { method = "GET", body, auth = true } = opts;
    const headers = {};
    if (body && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }
    if (auth) {
        const token = getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
    let res;
    try {
        res = await fetch(url, {
            method,
            headers,
            body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
            cache: "no-store"
        });
    } catch (error) {
        console.error("Fetch failed:", error);
        console.error("Tried URL:", url);
        throw new Error(`Cannot connect to backend server: ${url}`);
    }
    const data = await res.json().catch(()=>({}));
    if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
}
const safeRole = (role)=>{
    if (role === "farmer" || role === "restaurant" || role === "industrial" || role === "customer" || role === "admin") {
        return role;
    }
    return "customer";
};
function getImageUrl(image) {
    if (!image) return "";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return `http://localhost:5001${image}`;
}
function isDirectImageUrl(url) {
    if (!url) return false;
    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(url);
}
const authApi = {
    register: (body)=>request("/auth/register", {
            method: "POST",
            body,
            auth: false
        }),
    login: (body)=>request("/auth/login", {
            method: "POST",
            body,
            auth: false
        }),
    me: ()=>request("/auth/me")
};
const userApi = {
    getProfile: ()=>request("/users/profile"),
    updateProfile: (body)=>request("/users/profile", {
            method: "PUT",
            body
        }),
    changePassword: (body)=>request("/users/password", {
            method: "PUT",
            body
        }),
    uploadAvatar: (form)=>request("/users/avatar", {
            method: "POST",
            body: form
        })
};
const productApi = {
    list: async (params)=>{
        const q = params ? "?" + new URLSearchParams(params).toString() : "";
        const res = await request(`/products${q}`, {
            auth: false
        });
        return {
            products: (res.products || []).map((p)=>({
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
                    createdAt: p.created_at ?? p.createdAt
                })),
            total: Number(res.total || 0),
            pages: Number(res.pages || 1)
        };
    },
    mine: async ()=>{
        const res = await request(`/products?mine=true`);
        return {
            products: (res.products || []).map((p)=>({
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
                    createdAt: p.created_at ?? p.createdAt
                })),
            total: Number(res.total || 0),
            pages: Number(res.pages || 1)
        };
    },
    get: async (slug)=>{
        const res = await request(`/products/${slug}`, {
            auth: false
        });
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
                createdAt: res.product.created_at ?? res.product.createdAt
            }
        };
    },
    create: (form)=>request("/products", {
            method: "POST",
            body: form
        }),
    update: (id, form)=>request(`/products/${id}`, {
            method: "PUT",
            body: form
        }),
    delete: (id)=>request(`/products/${id}`, {
            method: "DELETE"
        })
};
const farmerApi = {
    list: async (params)=>{
        const q = params ? "?" + new URLSearchParams(params).toString() : "";
        const res = await request(`/farmers${q}`, {
            auth: false
        });
        return {
            farmers: (res.farmers || []).map((f)=>({
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
                    role: "farmer"
                })),
            total: Number(res.total || 0)
        };
    },
    get: async (id)=>{
        const res = await request(`/farmers/${id}`, {
            auth: false
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
                role: "farmer"
            },
            products: res.products || []
        };
    }
};
const cartApi = {
    get: async ()=>{
        const res = await request("/cart");
        return {
            items: (res.items || []).map((item)=>({
                    product: {
                        _id: String(item.product?.id ?? item.product?._id ?? item.product_id ?? item.id),
                        name: item.product?.name ?? item.name ?? "Unnamed product",
                        slug: item.product?.slug ?? item.slug ?? "",
                        category: item.product?.category ?? item.category ?? "",
                        productType: item.product?.product_type ?? item.product?.productType ?? item.product_type ?? "",
                        description: item.product?.description ?? item.description ?? "",
                        image: item.product?.image ?? item.image ?? "",
                        quantityAvailable: Number(item.product?.available_quantity ?? item.product?.quantity_available ?? item.product?.quantityAvailable ?? item.available_quantity ?? item.quantity_available ?? 0),
                        unit: item.product?.unit ?? item.unit ?? "",
                        price: Number(item.product?.price ?? item.price ?? 0),
                        sellerId: String(item.product?.seller_id ?? item.product?.sellerId ?? item.seller_id ?? ""),
                        sellerName: item.product?.seller_name ?? item.product?.sellerName ?? item.seller_name ?? "",
                        sellerRole: item.product?.seller_role ?? item.product?.sellerRole ?? item.seller_role ?? "",
                        isActive: item.product?.is_active ?? item.product?.isActive ?? true,
                        createdAt: item.product?.created_at ?? item.product?.createdAt ?? item.created_at ?? ""
                    },
                    quantity: Number(item.quantity ?? 1)
                })),
            total: Number(res.total || 0)
        };
    },
    add: (productId, quantity = 1)=>request("/cart", {
            method: "POST",
            body: {
                productId,
                quantity
            }
        }),
    update: (productId, quantity)=>request(`/cart/${productId}`, {
            method: "PUT",
            body: {
                quantity
            }
        }),
    remove: (productId)=>request(`/cart/${productId}`, {
            method: "DELETE"
        }),
    clear: ()=>request("/cart", {
            method: "DELETE"
        })
};
const wishlistApi = {
    get: ()=>request("/wishlist"),
    toggle: (productId)=>request(`/wishlist/${productId}`, {
            method: "POST"
        }),
    clear: ()=>request("/wishlist", {
            method: "DELETE"
        })
};
const orderApi = {
    place: (body)=>request("/orders", {
            method: "POST",
            body
        }),
    list: async (params)=>{
        const q = params ? "?" + new URLSearchParams(params).toString() : "";
        const res = await request(`/orders${q}`);
        return {
            orders: (res.orders || []).map((o)=>({
                    _id: String(o.id ?? o._id),
                    buyer: o.buyer ? {
                        _id: String(o.buyer.id ?? o.buyer._id ?? ""),
                        name: o.buyer.full_name ?? o.buyer.name ?? "Unknown buyer",
                        email: o.buyer.email ?? "",
                        phone: o.buyer.phone,
                        role: safeRole(o.buyer.role),
                        city: o.buyer.city,
                        address: o.buyer.address
                    } : {
                        _id: String(o.buyer_id ?? ""),
                        name: o.buyer_name ?? "Unknown buyer",
                        email: "",
                        role: "customer"
                    },
                    items: o.items || [],
                    totalAmount: Number(o.total_amount ?? o.totalAmount ?? 0),
                    status: o.status,
                    shippingAddress: o.shipping_address ?? o.shippingAddress,
                    notes: o.notes,
                    createdAt: o.created_at ?? o.createdAt
                })),
            total: Number(res.total || 0)
        };
    },
    get: async (id)=>{
        const res = await request(`/orders/${id}`);
        const o = res.order;
        return {
            order: {
                _id: String(o.id ?? o._id),
                buyer: o.buyer ? {
                    _id: String(o.buyer.id ?? o.buyer._id ?? ""),
                    name: o.buyer.full_name ?? o.buyer.name ?? "Unknown buyer",
                    email: o.buyer.email ?? "",
                    phone: o.buyer.phone,
                    role: safeRole(o.buyer.role),
                    city: o.buyer.city,
                    address: o.buyer.address
                } : {
                    _id: String(o.buyer_id ?? ""),
                    name: o.buyer_name ?? "Unknown buyer",
                    email: "",
                    role: "customer"
                },
                items: o.items || [],
                totalAmount: Number(o.total_amount ?? o.totalAmount ?? 0),
                status: o.status,
                shippingAddress: o.shipping_address ?? o.shippingAddress,
                notes: o.notes,
                createdAt: o.created_at ?? o.createdAt
            }
        };
    },
    updateStatus: (id, status)=>request(`/orders/${id}/status`, {
            method: "PUT",
            body: {
                status
            }
        }),
    cancel: (id)=>request(`/orders/${id}`, {
            method: "DELETE"
        })
};
const notificationApi = {
    list: async ()=>{
        const res = await request("/notifications");
        return {
            notifications: (res.notifications || []).map((n, index)=>({
                    _id: String(n.id ?? n._id ?? `${index}`),
                    title: n.title ?? "Notification",
                    message: n.message ?? "",
                    type: n.type ?? "general",
                    isRead: Boolean(n.is_read ?? n.isRead ?? false),
                    createdAt: n.created_at ?? n.createdAt ?? ""
                }))
        };
    },
    read: (id)=>request(`/notifications/${id}/read`, {
            method: "PUT"
        })
};
const chatbotApi = {
    ask: (message)=>request("/chatbot", {
            method: "POST",
            body: {
                message
            }
        })
};
const messageApi = {
    inbox: ()=>request("/messages/inbox"),
    thread: (userId)=>request(`/messages/thread/${userId}`),
    send: (body)=>request("/messages", {
            method: "POST",
            body
        }),
    unreadCount: ()=>request("/messages/unread-count")
};
const adminApi = {
    stats: ()=>request("/admin/stats"),
    users: (params)=>{
        const q = params ? "?" + new URLSearchParams(params).toString() : "";
        return request(`/admin/users${q}`);
    },
    updateUser: (id, body)=>request(`/admin/users/${id}`, {
            method: "PUT",
            body
        }),
    deactivateUser: (id)=>request(`/admin/users/${id}`, {
            method: "DELETE"
        }),
    orders: (params)=>{
        const q = params ? "?" + new URLSearchParams(params).toString() : "";
        return request(`/admin/orders${q}`);
    }
};
function saveSession(token, user) {
    localStorage.setItem("fl_token", token);
    localStorage.setItem("fl_user", JSON.stringify(user));
    window.dispatchEvent(new Event("auth-changed"));
}
function clearSession() {
    localStorage.removeItem("fl_token");
    localStorage.removeItem("fl_user");
    window.dispatchEvent(new Event("auth-changed"));
}
function getStoredUser() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function TopNav() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const syncAuth = ()=>{
            setUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStoredUser"])());
        };
        setMounted(true);
        syncAuth();
        window.addEventListener("auth-changed", syncAuth);
        return ()=>{
            window.removeEventListener("auth-changed", syncAuth);
        };
    }, []);
    const logout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSession"])();
        setUser(null);
        router.push("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "topbar",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container topbar-inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "brand",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "brand-badge",
                            children: "🌿"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Farmlink Plus"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "nav",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: `nav-link ${pathname === "/" ? "active" : ""}`,
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/marketplace",
                            className: `nav-link ${pathname === "/marketplace" ? "active" : ""}`,
                            children: "Marketplace"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/farmers",
                            className: `nav-link ${pathname === "/farmers" ? "active" : ""}`,
                            children: "Farmers"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        !mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: `nav-link ${pathname === "/login" ? "active" : ""}`,
                            children: "Login"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: `nav-link ${pathname === "/dashboard" ? "active" : ""}`,
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-danger",
                                    onClick: logout,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: `nav-link ${pathname === "/login" ? "active" : ""}`,
                            children: "Login"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/TopNav.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/farmlink_plus_full_project/frontend/src/components/ChatbotFloatingButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatbotFloatingButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
function ChatbotFloatingButton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: "/chatbot",
        style: {
            position: "fixed",
            right: 22,
            bottom: 22,
            zIndex: 1000,
            background: "linear-gradient(135deg, #1f6f43, #2d8f57)",
            color: "#fff",
            width: 62,
            height: 62,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            boxShadow: "0 14px 30px rgba(31,111,67,0.28)",
            fontSize: 26
        },
        title: "Open chatbot",
        children: "💬"
    }, void 0, false, {
        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/ChatbotFloatingButton.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4be0f56d._.js.map