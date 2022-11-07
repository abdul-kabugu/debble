import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import {TbPlaylist} from 'react-icons/tb'
import {BsCloudUpload} from 'react-icons/bs'
import {GiMoneyStack} from 'react-icons/gi'
import {BiTimeFive} from 'react-icons/bi'
export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'PlayLists', to: '/playlists', icon: TbPlaylist },
  { name: 'My PlayLists', to: '/myplalists', icon: TbPlaylist },
  { name: 'New Song', to: '/upload', icon: BsCloudUpload },
];

  export const currencies =  [
    {
      title : "Wrapped Matic",
       value : "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
    },
    {
      title : "WETH",
       value : "0x3C68CE8504087f89c640D02d133646d98e64ddd9"
    },
    {
      title : "USDC",
       value : "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e"
    },
    {
      title : "DAI",
       value : "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F"
    },
  ]

  export const  collectModules = [
    {
      title : "Limited Fee Collect",
       contractAddress : "0xFCDA2801a31ba70dfe542793020a934F880D54aB",
       firstIcon : GiMoneyStack,
       collectModule : 'LimitedFeeCollectModule'
    },

    {
      title : "Fee Collect",
       contractAddress : "0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82",
       firstIcon : GiMoneyStack,
       collectModule : 'FeeCollectModule'
    },

    {
      title : "Limited Time Fee Collect",
       contractAddress : "0xDa76E44775C441eF53B9c769d175fB2948F15e1C",
       firstIcon : GiMoneyStack,
       secondIcon : BiTimeFive,
       collectModule : 'LimitedTimedFeeCollectModule'
    },
    {
      title : "Timed Fee Collect",
       contractAddress : "0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db",
       firstIcon : GiMoneyStack,
       collectModule : 'TimedFeeCollectModule'
    },
  ]
