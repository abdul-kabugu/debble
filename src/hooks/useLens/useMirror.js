import {useMoralis} from 'react-moralis'
import {lensHub} from '../../utils/lens-hub'
import {signText, signedTypeData, splitSignature} from '../../utils/ether-service'
import { apolloClient } from '../../graphql/apolo/apoloClient'
import { MIRROR_SONG } from '../../graphql/query/mirrorSong'

  // TODO types
const createMirrorTypedData = (createMirrorTypedDataRequest) => {
    return apolloClient.mutate({
      mutation: (MIRROR_SONG),
      variables: {
        request: createMirrorTypedDataRequest,
      },
    });
  };

   export const useMirror = () => {
      const mirror = async (postId, profileId) => {
        if(!profileId){
            alert("connect  your  profile first")
         }

         const createMirrorRequest = {
            profileId : profileId,
            publicationId: postId,
            referenceModule: {
                followerOnlyReferenceModule: false,
              },
          }

          try{
            const result = await createMirrorTypedData(createMirrorRequest);
            const typedData = result.data.createMirrorTypedData.typedData;
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
            const { v, r, s } = splitSignature(signature);
      
            const tx = await lensHub.mirrorWithSig({
              profileId: typedData.value.profileId,
              profileIdPointed: typedData.value.profileIdPointed,
              pubIdPointed: typedData.value.pubIdPointed,
              referenceModuleData: typedData.value.referenceModuleData,
              referenceModule: typedData.value.referenceModule,
              referenceModuleInitData: typedData.value.referenceModuleInitData,
              sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline,
              },
            });
          } catch (error) {
              alert(error)
          }
      }

      return {mirror}
   }


 