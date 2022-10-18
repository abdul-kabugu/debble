import {useQuery} from '@apollo/client'
import {GET_ARTIST_PROFILE} from '../../graphql/query/getArtistProfile'
  export const useGetArtistProfile = (id) => {
    const {data: artistProfile, loading : isArtistProfileLoading, error : isArtistProfileError} = useQuery(GET_ARTIST_PROFILE, {
        variables : {
            request : {
                "profileId" : id
            }
        }
    })

    return{
        artistProfile,
        isArtistProfileLoading,
        isArtistProfileError
    }
  }