import {useQuery} from '@apollo/client'
import {GET_DEFAULT_PROFILE} from '../../graphql/query/getDefaultProfile'

  export const useGetDefaultId = (address) => {
    const {data, error, loading} = useQuery(GET_DEFAULT_PROFILE, {
        variables : {
            request: {
                ethereumAddress : address
            }
        }
    })

    return {data, loading, error}

  }