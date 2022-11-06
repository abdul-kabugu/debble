import {gql} from '@apollo/client'

export const APPROVE_MODULE_AMOUNT = gql `
query GenerateModuleCurrencyApprovalData ($request : GenerateModuleCurrencyApprovalDataRequest!){
  generateModuleCurrencyApprovalData(request: $request) {
    to
    from
    data
  }
}

`

/*{
    currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
    value: "10",
    collectModule: LimitedFeeCollectModule
  }*/