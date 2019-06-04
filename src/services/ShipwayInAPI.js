
import { Constants, Config } from "@common";
import { request, error } from "./../Omni";

const url = Config.ShipwayIn.url;
const username = Config.ShipwayIn.username;
const password = Config.ShipwayIn.password;

const ShipwayInAPI = {
  getOrderShipmentDetails: async (order_id) => {
    const _url = `${url}/getOrderShipmentDetails`,
      data = {
        username,
        password,
        order_id
      };
    return await request(_url, { method: 'POST', body: JSON.stringify(data) });
  },
};

export default ShipwayInAPI;
