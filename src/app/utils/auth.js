import { API_BASE_URL } from "./constants";

export async function checkUserSession() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/session`);
      if (response.ok) {
        console.log("api/user/session response: ", response);
        const data = await response.json();
        return data.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error checking session:", error);
      return null;
    }
  }