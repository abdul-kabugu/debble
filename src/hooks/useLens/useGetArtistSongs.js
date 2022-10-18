import {useQuery} from '@apollo/client'
import {GET_ARTIST_SONGS} from '../../graphql/query/getArtistSongs'

   export const useGetArtistSongs = (id) => {
    const {data : artistSongs, loading : isGetArtistSongsLoading, error : isGetArtistSongsError} = useQuery(GET_ARTIST_SONGS,{
        variables : {
            request : {
                "profileId": id,
                "publicationTypes": ["POST",  "MIRROR"],
                "sources": ["audios"]
            }
        }
    })

     return{
        artistSongs, isGetArtistSongsLoading, isGetArtistSongsError
     }
   }