import {gql} from '@apollo/client'
  
  export const ENABLE_DISPATCH = gql `
  mutation CreateSetDispatcherTypedData ($request :  SetDispatcherRequest!) {
    createSetDispatcherTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDispatcherWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          dispatcher
        }
      }
    }
  }
  
  
  `