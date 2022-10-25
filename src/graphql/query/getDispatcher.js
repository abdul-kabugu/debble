import {gql} from '@apollo/client'

export const GET_DISPATCHER = gql`

query Profile ($request : SingleProfileQueryRequest!) {
    profile(request: $request) {
      dispatcher { 
        address
        canUseRelay
      }
    }
  }
`

