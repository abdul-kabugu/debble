import {useQuery} from '@apollo/client'
import {GET_APPROVED_MODULE_AMOUNT} from '../../graphql/query/getApprovedModuleAmount'

export const useGetApprovedAmount = (currency, collectModules) => {
    const {data : approvedAmount, loading : isApprovedAmountLoading, error : isApprovedAmountError} = useQuery(GET_APPROVED_MODULE_AMOUNT, {
        variables : {
            request : {
                currencies : currency,
                collectModules: [collectModules],
                followModules: ["FeeFollowModule", "RevertFollowModule", "ProfileFollowModule"],
                referenceModules: ["FollowerOnlyReferenceModule"]
            }
        }
    })
   return {
    approvedAmount,
    isApprovedAmountLoading,
    isApprovedAmountError
   }

}