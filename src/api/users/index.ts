import { AxiosInstance } from 'axios';
import password from "./password";

export default function (instance: AxiosInstance) {
  return {
    password: password(instance),
  };
}
