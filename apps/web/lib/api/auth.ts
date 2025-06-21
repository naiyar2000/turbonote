import { postWrapper } from "@/app/api";

export const fetchUserDetails = async (email: string) => {
    const response = await postWrapper('/api/auth/user', {
        email: email
    });

    if (!response.user) {
        throw new Error('Failed to fetch user details');
    }

    return response.user;
}