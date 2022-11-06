import { gql} from '@apollo/client'
import {apolloClient} from '../graphql/apolo/apoloClient'
import {sendTx} from '../utils/ether-service'
import {ENABLED_MODULE_CURRENCIES} from '../graphql/query/enableModuleCurrencies'
import {APPROVE_MODULE_AMOUNT} from '../graphql/query/approveModuleAmount'



export const useHandleApproveModule = () =>  {
    const getModuleApprovalData = async (request) =>  {
      
      const result = await apolloClient.query({
    query : APPROVE_MODULE_AMOUNT,
     variables :{
        request : request
       
     }
      })
      return result?.data?.generateModuleCurrencyApprovalData;
             
    }
  
     console.log("the result")
     const approveModule = async () =>  {
        const currencies = "0x3C68CE8504087f89c640D02d133646d98e64ddd9"
        const generateModuleCurrencyApprovalData = await getModuleApprovalData({
            currency: currencies,
            value: '500',
            collectModule: "LimitedTimedFeeCollectModule",
          });
          console.log('approve module: result', generateModuleCurrencyApprovalData);

          const tx = await sendTx({
            to: generateModuleCurrencyApprovalData?.to,
            from: generateModuleCurrencyApprovalData?.from,
            data: generateModuleCurrencyApprovalData?.data,
          });
        
          console.log('approve module: txHash', tx?.hash);
        
          await tx.wait();
        
          console.log('approve module: txHash mined', tx?.hash);
        
     }

     return {
        approveModule, getModuleApprovalData
     }
}