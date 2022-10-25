import {gql} from '@apollo/client'


export const COLLECT_SONGS = gql`
mutation($request: CreateCollectRequest!) { 
  createCollectTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        CollectWithSig {
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
      pubId
      data
    }
   }
 }
}
`