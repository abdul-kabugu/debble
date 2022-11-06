import {gql} from '@apollo/client'

  export const GET_APPROVED_MODULE_AMOUNT = gql `
  query ApprovedModuleAllowanceAmount ($request : ApprovedModuleAllowanceAmountRequest! ){
    approvedModuleAllowanceAmount(request: $request) {
      currency
      module
      contractAddress
      allowance
    }
  }
  
  `


/*  {
    currencies: ["0x3C68CE8504087f89c640D02d133646d98e64ddd9"],
    collectModules: [LimitedFeeCollectModule, FeeCollectModule, LimitedTimedFeeCollectModule, TimedFeeCollectModule, FreeCollectModule, RevertCollectModule],
    followModules: [FeeFollowModule, RevertFollowModule, ProfileFollowModule],
    referenceModules: [FollowerOnlyReferenceModule]
  }*/