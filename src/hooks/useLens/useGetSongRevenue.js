import {useQuery} from '@apollo/client'
 import {GET_ALBUM_REVENUE} from '../../graphql/query/getSongRevenue'
  export const useGetSongRevenue = (songid) => {
      const {data: songRevenueStats, loading : isSongReveneuStatsLoading, error : isSongRevenueStatsError} = useQuery(GET_ALBUM_REVENUE, {
        variables : {
            request : {
                "publicationId" : songid 
            }
        }
      })

      return{
        songRevenueStats,
        isSongReveneuStatsLoading,
        isSongRevenueStatsError
      }
  }