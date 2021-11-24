import axios from "axios";

/**
 * Method to retrieve user data
 * @param {any} user
 * @returns {JSON}
 */
const getCurrentuser = async (user: any) => {
  const { data } = await axios.get(`/api/user/${user.id}`);
  return data;
};

export default getCurrentuser;
