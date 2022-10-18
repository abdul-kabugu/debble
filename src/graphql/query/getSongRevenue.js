import {gql} from "@apollo/client"

export const GET_ALBUM_REVENUE = gql`
query Revenue($request: PublicationRevenueQueryRequest!) {
    publicationRevenue(request: $request) {
      revenue {
        total {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
      }
    }
  }


   `