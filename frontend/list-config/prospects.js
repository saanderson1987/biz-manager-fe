import companies from "./companies";
import merge from "lodash.merge";

export default merge({}, companies, {
  params: {
    listName: "Prospects",
    queryParamsForGetByQuery: {
      status: "prospect",
    },
  },
});
