export const ROUTES = {
  USER: {
    HOME: "/",
    CART: "/cart",
    ORDER: "/order",
    MYORDER: "/myorder",
    MENU: "/menu",
    CONTACT: "/contact",
    APP: "/app",
    PROFILE: "/profile"
  },
  ADMIN: {
    DASHBOARD: "/admin",
    ADD_PRODUCT: '/admin/new-product',
    VIEW_PRODUCT: '/admin/view-product',
    ORDER: '/admin/orders'
  }
} as const;