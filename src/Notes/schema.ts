import {gql} from 'apollo-server';

const NotesDefs =  gql`

  type Note {
    _id: String!
    content: String!
  }
`

export default NotesDefs;