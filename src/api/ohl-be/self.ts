import { User } from "@/types/models";

const selfAPI = async (token: string) : Promise<User> => {
  token
  return {
    username: 'admin'
  }
}

export default selfAPI;