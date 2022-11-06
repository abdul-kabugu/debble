import {gql} from '@apollo/client'

export const ENABLED_MODULE_CURRENCIES = gql ` query EnabledModuleCurrencies {
    enabledModuleCurrencies {
      name
      symbol
      decimals
      address
    }
  }`


