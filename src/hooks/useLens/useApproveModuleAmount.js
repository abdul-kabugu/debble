import {useQuery} from '@apollo/client'
import {APPROVE_MODULE_AMOUNT} from '../../graphql/query/approveModuleAmount'


export const useApproveModuleAmount = (currency,   collectModule) =>  {
    const {data : approveModule, loading : isApproveModuleLoading, error : isApproveModuleError} = useQuery(APPROVE_MODULE_AMOUNT, {
        variables : {
            request : {
                currency : currency,
                value : "1000",
                collectModule :  collectModule
            }
        }
    })
    
    return {
        approveModule,
        isApproveModuleError,
        isApproveModuleLoading
    }
}