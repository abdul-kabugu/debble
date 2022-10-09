import { useQuery } from "@apollo/client";
import {GET_USER_PROFILE_IDS} from '../../graphql/query/getUserProfileIds'

export const useGetUserProfiles = (address) => {
    const {data : userProfiles, loading : isUserProfilesLoading, error : isUserProfileError} = useQuery(GET_USER_PROFILE_IDS, {
        variables : {
            request : {
             ownedBy: [address]
            }
        }
    })

    return {
      userProfiles, isUserProfilesLoading, isUserProfileError
    }
}