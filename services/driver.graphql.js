import gql from "graphql-tag";


export const QUERY = {
  FIND_BY_ID: gql`
    query driverById($id: Int!) {
        drivers(where: {id: {_eq: $id}}) {
             id
            name
            surname
            username
            image_url
            experience
            driverTrucksBydriverId {
                image_id
                km
                trucksBytruckId {
                    model
                    type
                }
            }
        }
    }
  `
};

export default {
    QUERY
}
