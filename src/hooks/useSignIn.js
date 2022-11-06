import {useMoralis} from 'react-moralis'
import {apolloClient} from '../graphql/apolo/apoloClient'
import {signText, } from '../utils/ether-service'
import {gql} from '@apollo/client'



// request challeng
const GET_CHALLENGE = `
query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
}
`;
export const generateChallenge = async (address) => {
    const res = await apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            }
        }
    });
    return res.data.challenge.text;
    }

    // authenticate 
    const AUTHENTICATION = `
mutation($request: SignedAuthChallenge!) {
authenticate(request: $request) {
  accessToken
  refreshToken
}
}
`;

export const lensAuthenticate = async (address, signature) => {
    const { data } = await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
    });
    return data.authenticate.accessToken;
    };
    
const useSignIn  = () => {
    const { isAuthenticated, Moralis, user} = useMoralis()
       const account = user?.attributes?.ethAddress
     const signIn = async() => {
      
      try {
        if (!isAuthenticated) {
          return alert('Please connect your wallet first');
        }
       
        // generate  challenge 
        const challenge = await generateChallenge(account);
        //  sign  genereted  challenge
        const signature = await signText(challenge);
        // Get  access Token 
        const accessToken = await lensAuthenticate(account, signature);
       console.log({accessToken});
        // Store  access token  sessionStorage
        window.sessionStorage.setItem('accessToken', accessToken);
          
      } catch (error) {
        console.error(error);
      
      }
     }
     return {signIn}
}
export default useSignIn