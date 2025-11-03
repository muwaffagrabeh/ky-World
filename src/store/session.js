// مفاتيح التخزين المحلية
const K_ADMIN = "demo_auth_admin";
const K_USER = "demo_auth_user";
const K_ROLE = "demo_last_role"; // "admin" | "user"

export const isAuthedAdmin = () => localStorage.getItem(K_ADMIN) === "1";
export const isAuthedUser = () => localStorage.getItem(K_USER) === "1";

export const loginAdmin = () => {
  localStorage.setItem(K_ADMIN, "1");
  localStorage.setItem(K_ROLE, "admin");
};
export const loginUser = () => {
  localStorage.setItem(K_USER, "1");
  localStorage.setItem(K_ROLE, "user");
};

export const logoutAll = () => {
  localStorage.removeItem(K_ADMIN);
  localStorage.removeItem(K_USER);
  localStorage.removeItem(K_ROLE);
};

export const lastRole = () => localStorage.getItem(K_ROLE); // قد تكون null
