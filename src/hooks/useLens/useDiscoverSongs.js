import {useQuery} from '@apollo/client'
import {DISCOVER_SONGS} from '../../graphql/query/discoverSongs'


export const useDiscoverSongs = (tags) => {
    const {data :songs , loading : isSongsLoading, error: isSongsError} = useQuery(DISCOVER_SONGS, {
        variables : {
            request : {
                "sortCriteria":   "LATEST",  //"TOP_COLLECTED",
                "publicationTypes": ["POST", "MIRROR"],
                
                "sources":  ['audaxhack'],      //["audios"], 

                metadata : {
                    "mainContentFocus": ["AUDIO"],
                     "tags" : tags
                  }

            }
        }
    })

    return {songs, isSongsLoading, isSongsError}
}