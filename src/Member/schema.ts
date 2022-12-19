import {gql} from 'apollo-server';

const MemberDefs =  gql`

  input Member {
    account: String!
    password: String!
  }

  type Response {
    status: String!
    code: String!
    data: String!
  }

  type VerifyResponse{
    status: String!
    code: String!
    data: VerifyData
  }

  type VerifyData {
    account: String!
    authority: Int
  }
`

export default MemberDefs;