import {useQuery} from '@apollo/client'
import {GET_TOP_ARTISTS} from '../../graphql/query/getTopArtists'


export const useGetTopArtists = () => {
    const {data: topArtists, loading : isTopArtistsLoading, error: isTopArtistsError} = useQuery(GET_TOP_ARTISTS)
     return {
        topArtists, isTopArtistsLoading, isTopArtistsError
     }
}
