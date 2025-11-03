// path: src/store/userSession.js
export const isUserAuthed = () => localStorage.getItem("user_auth") === "1";

export function userLoginMock({
  name = "ضيف",
  email = "user@example.com",
} = {}) {
  localStorage.setItem("user_auth", "1");
  localStorage.setItem("user_profile", JSON.stringify({ name, email }));
}

export function userLogout() {
  localStorage.removeItem("user_auth");
  localStorage.removeItem("user_profile");
}
