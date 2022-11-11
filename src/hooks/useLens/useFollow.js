import {useMoralis} from 'react-moralis'
import {lensHub} from '../../utils/lens-hub'
import {signText, signedTypeData, splitSignature} from '../../utils/ether-service'
import { apolloClient } from '../../graphql/apolo/apoloClient'
import { FOLLOW_ARTIST } from '../../graphql/query/followArtists'
import {toast} from 'react-toastify'


 // TODO sort typed!
const createFollowTypedData = (followRequestInfo) => {
    return apolloClient.mutate({
      mutation: FOLLOW_ARTIST,
      variables: {
        request: {
          follow: followRequestInfo,
        },
      },
    });
  };


export const useFollow = () => {
     const {account} = useMoralis()
    const follow = async (profileId) => {
        if(!profileId){
            alert("connect  your  profile first")
         }

         const followRequest = [
            {
                profile : profileId,

            }
        ]
        try{
            const result = await createFollowTypedData(followRequest);
            const typedData = result.data.createFollowTypedData.typedData;
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
            const { v, r, s } = splitSignature(signature);
            const tx = await lensHub.followWithSig({
                follower: account,
                profileIds: typedData.value.profileIds,
                datas: typedData.value.datas,
                sig: {
                  v,
                  r,
                  s,
                  deadline: typedData.value.deadline,
                },
              });
              console.log('follow: tx hash', tx.hash);
              //return tx.hash;
            
            } catch (error) {
               // alert(error)
               toast(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                
              })
            }
    }

    return {follow}
}