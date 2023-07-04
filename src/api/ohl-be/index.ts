import axios from "axios"
import loginAPI from "./login"
import selfAPI from "./self"

export const api = axios.create()

const OHLBEAPI = {
  login: loginAPI,
  self: selfAPI
}

// add try catch for every key
for (const key in OHLBEAPI) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = OHLBEAPI[key as keyof typeof OHLBEAPI] as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OHLBEAPI[key as keyof typeof OHLBEAPI] = async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error(error) // Untuk debugging 😁
      throw error
    }
  }
}

export type OHLBEAPIType = typeof OHLBEAPI
export default OHLBEAPI