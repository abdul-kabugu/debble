import {useMoralis} from 'react-moralis'
import {lensHub} from '../../utils/lens-hub'
import {signText, signedTypeData, splitSignature} from '../../utils/ether-service'
import { apolloClient } from '../../graphql/apolo/apoloClient'
import { ENABLE_DISPATCH } from '../../graphql/query/enableDispach'


 const enableDispatcherWithTypedData = async (request) => {
    const result = await apolloClient.mutate({
      mutation: ENABLE_DISPATCH,
      variables: {
        request,
      },
    });
  
    return result.data?.createSetDispatcherTypedData;
  };

  export const  useEnableDispatch = () => {
     const enableDispatch = async (profileId) => {
        if (!profileId) {
            throw new Error('Must define Log-in with lens to enable dispatch');
          }
          const result = await enableDispatcherWithTypedData({
            profileId,
            // leave it blank if you want to use the lens API dispatcher!
            // dispatcher: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
          });
          const typedData = result.typedData;
           try {
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log('set dispatcher: signature', signature);

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.setDispatcherWithSig({
    profileId: typedData.value.profileId,
    dispatcher: typedData.value.dispatcher,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log('set dispatcher: tx hash', tx.hash);
} catch (error) {
    alert(error)
}
 

     }

     return {enableDispatch}
  }