import {useQuery} from '@apollo/client'
import { GET_DISPATCHER } from '../../graphql/query/getDispatcher'


  export const useGetDispatcher = (id) => {
    const {data : dispatcher, loading : isDispatcherLoading, error : isDispatcherError } = useQuery(GET_DISPATCHER , {
        variables : {
            request : {
                "profileId" : id
            }
        }
    })

  return{
    dispatcher,
    isDispatcherLoading,
    isDispatcherError
  }
  }
