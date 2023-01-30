import envProd from "../environments/envProd";
import envDev from "../environments/envDev";

export const getEnvironment = () => {

  if(import.meta.env.DEV) return {
    ...envDev
  }

  return {
    ...envProd
  }
}
