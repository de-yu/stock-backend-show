import {gql} from 'apollo-server';

const TracingStockDefs =  gql`

type RecordItem {
  stock: String
  factor: String
}

type StockRecord {
  title: String
  items: [RecordItem]
}



`

export default TracingStockDefs;