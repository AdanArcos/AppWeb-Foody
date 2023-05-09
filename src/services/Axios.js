import Axios from "axios";

export const host = `http://localhost:4000`;

export default Axios.create({
  baseURL: host + "/api/V1",
});
