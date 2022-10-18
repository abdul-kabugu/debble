import {useQuery} from '@apollo/client'
import {GET_LATEST_SONGS} from '../../graphql/query/getLatestSongs'
  export const useGetLatestSongs = () => {
    const {data: latestSongs, loading: isLatestSongsLoading, error :isLatestSongsError}  =  useQuery(GET_LATEST_SONGS)
    return{
        latestSongs, isLatestSongsLoading, isLatestSongsError
    }
  }