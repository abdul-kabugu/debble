import {useQuery} from '@apollo/client'
import {GET_SONG_DETAILS} from '../../graphql/query/getSongDetails'
  export const useGetSongDetails = (songid) => {
    const {data: songDetail, loading: isSongDetailsLoading, error: isSongDetailsError} = useQuery(GET_SONG_DETAILS, {
        variables : {
            request: {
                "publicationId" : songid
            }
        }
    })

    return {songDetail, isSongDetailsLoading, isSongDetailsError}
  }