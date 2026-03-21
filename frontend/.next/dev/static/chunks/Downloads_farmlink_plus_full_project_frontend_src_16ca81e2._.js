(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/farmlink_plus_full_project/frontend/src/components/AuthGuard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthGuard({ children, roles }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredUser"])();
            if (!user) {
                router.replace("/login");
                return;
            }
            if (roles && !roles.includes(user.role)) {
                router.replace("/dashboard");
                return;
            }
            setReady(true);
        }
    }["AuthGuard.useEffect"], [
        router,
        roles
    ]);
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "empty",
        children: "Checking access…"
    }, void 0, false, {
        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/AuthGuard.tsx",
        lineNumber: 5,
        columnNumber: 414
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthGuard, "Y1I7BYRoEDptsXuBAVTFZEyapYQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const mainLinks = [
    {
        href: "/dashboard",
        label: "Dashboard"
    },
    {
        href: "/marketplace",
        label: "Marketplace"
    },
    {
        href: "/farmers",
        label: "Farmers"
    },
    {
        href: "/cart",
        label: "Cart"
    },
    {
        href: "/orders",
        label: "Orders"
    },
    {
        href: "/notifications",
        label: "Notifications"
    },
    {
        href: "/messages",
        label: "Messages"
    },
    {
        href: "/chatbot",
        label: "Chatbot"
    },
    {
        href: "/profile",
        label: "Profile"
    },
    {
        href: "/settings",
        label: "Settings"
    }
];
const sellerLinks = [
    {
        href: "/products/add",
        label: "Add Product"
    },
    {
        href: "/products/manage",
        label: "Manage Products"
    }
];
function DashboardShell({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardShell.useEffect": ()=>{
            const syncAuth = {
                "DashboardShell.useEffect.syncAuth": ()=>{
                    setUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredUser"])());
                }
            }["DashboardShell.useEffect.syncAuth"];
            syncAuth();
            window.addEventListener("auth-changed", syncAuth);
            return ({
                "DashboardShell.useEffect": ()=>{
                    window.removeEventListener("auth-changed", syncAuth);
                }
            })["DashboardShell.useEffect"];
        }
    }["DashboardShell.useEffect"], []);
    const logout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
        setUser(null);
        router.push("/login");
    };
    const isSeller = user?.role === "farmer" || user?.role === "restaurant" || user?.role === "industrial";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "section",
        style: {
            paddingTop: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container dashboard-shell",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "sidebar",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sidebar-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sidebar-title",
                                children: "Workspace"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 14,
                                    marginBottom: 12,
                                    borderRadius: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "title-md",
                                        style: {
                                            marginBottom: 4
                                        },
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "muted",
                                        children: user.role
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this),
                            mainLinks.map((item)=>{
                                const active = pathname === item.href;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: `sidebar-link ${active ? "active" : ""}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                        lineNumber: 77,
                                        columnNumber: 19
                                    }, this)
                                }, item.href, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, this);
                            }),
                            isSeller && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sidebar-title",
                                        children: "Seller Tools"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this),
                                    sellerLinks.map((item)=>{
                                        const active = pathname === item.href;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            className: `sidebar-link ${active ? "active" : ""}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                                lineNumber: 94,
                                                columnNumber: 23
                                            }, this)
                                        }, item.href, false, {
                                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                            lineNumber: 89,
                                            columnNumber: 21
                                        }, this);
                                    })
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-danger",
                                style: {
                                    marginTop: 14,
                                    width: "100%"
                                },
                                onClick: logout,
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "content-stack",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(DashboardShell, "RjqyScMztoOV2nHJmNYTgbcEncM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardShell;
var _c;
__turbopack_context__.k.register(_c, "DashboardShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PageHeader({ title, text, badge = "Farmlink Plus" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "page-hero",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-hero-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "page-hero-subtitle",
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx",
                        lineNumber: 12,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx",
                        lineNumber: 13,
                        columnNumber: 13
                    }, this),
                    text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx",
                        lineNumber: 14,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx",
                lineNumber: 11,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx",
            lineNumber: 10,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx",
        lineNumber: 9,
        columnNumber: 7
    }, this);
}
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatbotPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/components/AuthGuard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$components$2f$DashboardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/components/DashboardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/components/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/farmlink_plus_full_project/frontend/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ChatbotPage() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: "bot",
            text: "Hello! I am Farmlink Assistant. Ask me about products, farmers, orders, delivery, or selling."
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "Show vegetables",
        "Find farmers in Kathmandu",
        "How do I place an order?",
        "How do I add a product?"
    ]);
    const sendMessage = async (customText)=>{
        const text = (customText ?? input).trim();
        if (!text || loading) return;
        setMessages((prev)=>[
                ...prev,
                {
                    role: "user",
                    text
                }
            ]);
        setInput("");
        setLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatbotApi"].ask(text);
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "bot",
                        text: res.reply || "Sorry, I could not reply right now."
                    }
                ]);
            setSuggestions(res.suggestions || []);
        } catch (e) {
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "bot",
                        text: e.message || "Chatbot is not available right now."
                    }
                ]);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Farmlink Assistant",
                text: "Ask about products, farmers, orders, delivery, and seller actions.",
                badge: "CHATBOT"
            }, void 0, false, {
                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$src$2f$components$2f$DashboardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card card-pad",
                    style: {
                        minHeight: 650
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                maxHeight: 430,
                                overflowY: "auto",
                                padding: "8px 4px 16px"
                            },
                            children: [
                                messages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxWidth: "75%",
                                                padding: "14px 16px",
                                                borderRadius: 18,
                                                background: msg.role === "user" ? "#1f6f43" : "#f4f7f2",
                                                color: msg.role === "user" ? "#fff" : "#1d2a1f",
                                                whiteSpace: "pre-line",
                                                lineHeight: 1.5,
                                                border: msg.role === "bot" ? "1px solid #dbe8d7" : "none"
                                            },
                                            children: msg.text
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    }, `${msg.role}-${index}`, false, {
                                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this)),
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "flex-start"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            maxWidth: "75%",
                                            padding: "14px 16px",
                                            borderRadius: 18,
                                            background: "#f4f7f2",
                                            border: "1px solid #dbe8d7"
                                        },
                                        children: "Thinking..."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 18
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "muted",
                                    style: {
                                        marginBottom: 10
                                    },
                                    children: "Quick questions"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 10
                                    },
                                    children: suggestions.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "btn btn-secondary",
                                            onClick: ()=>sendMessage(item),
                                            children: item
                                        }, `${item}-${index}`, false, {
                                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 12,
                                marginTop: 22,
                                alignItems: "center",
                                flexWrap: "wrap"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "input",
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    placeholder: "Ask something...",
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter") sendMessage();
                                    },
                                    style: {
                                        flex: 1,
                                        minWidth: 240
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$farmlink_plus_full_project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary",
                                    onClick: ()=>sendMessage(),
                                    disabled: loading,
                                    children: "Send"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/farmlink_plus_full_project/frontend/src/app/chatbot/page.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(ChatbotPage, "6s+PPevsODZrba9FQjyQ+lMOUIY=");
_c = ChatbotPage;
var _c;
__turbopack_context__.k.register(_c, "ChatbotPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_farmlink_plus_full_project_frontend_src_16ca81e2._.js.map