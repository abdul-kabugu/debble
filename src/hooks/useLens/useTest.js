import {useQuery} from '@apollo/client'
import {TEST_GET_PUB}  from '../../graphql/query/testgetsongs'

  export const useTest = (id) => {
    const {data: testing, loading : isTestLoading, error : isTestError} = useQuery(TEST_GET_PUB, {
        variables : {
            request : {
                "profileId": id,
                "publicationTypes": ["POST",  "MIRROR"],
                "sources": ["audios"]
            }
        }
    })

    return {
        testing, isTestError, isTestLoading
    }
  }