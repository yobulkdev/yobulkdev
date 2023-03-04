import { getToken } from "next-auth/jwt"

const getUserInfo = async (req) => {
    const userData = await getToken({req})
    return userData;
}

export default getUserInfo;