import { getSession } from '@auth0/nextjs-auth0';

const getUserInfo = async (req, res) => {
  try {
    const userData = await getSession(req, res);
    return userData?.user;
  } catch (error) {
    console.error(error);
    return { email: 'none' };
  }
};

export default getUserInfo;
