import {useQuery} from '@apollo/client'
import {TEST_GET_PUB}  from '../../graphql/query/testgetsongs'

  export const useTest = (songid) => {
    const {data: testing, loading : isTestLoading, error : isTestError} = useQuery(TEST_GET_PUB, {
        variables : {
            request : {
                "publicationId" : songid
            }
        }
    })

    return {
        testing, isTestError, isTestLoading
    }
  }