import { useQuery } from "@apollo/client";
import { useMoralis } from "react-moralis";
import {GET_USER_PROFILE_IDS} from '../../graphql/query/getUserProfileIds'


export const useGetUserProfiles = () => {
    
    const {user, isAuthenticated} = useMoralis()
    
     const address  = user?.attributes?.ethAddress
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