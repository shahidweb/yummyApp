import { apiService } from "./genericService";

export const fetchUser = async () => {
    try {
        const response = await apiService.get("/me");
        console.log(response);
    } catch (error) {
        console.error("Session invalid or expired, redirecting to login...");
    }
};