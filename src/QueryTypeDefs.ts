import {gql} from 'apollo-server';

const QueryTypeDefs = gql`

  type Query {
    marketStockList: MarketStocks @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketStock(id: String): MarketStocks @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketStockHistory(id: String): MarketStockHistory @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketStockMonthRevenue(id: String): MarketStockMonthRevenue @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketStockInvestmentMechanism(id: String): MarketStockInvestmentMechanism @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketStockVolumnRank: MarketStockVolumnRank @cacheControl (maxAge: 3600 , scope: PUBLIC)

    marketData: MarketData @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketInvestmentMechanism: MarketInvestmentMechism @cacheControl (maxAge: 3600 , scope: PUBLIC)
    marketDayTrading: MarketDayTrading @cacheControl (maxAge: 3600 , scope: PUBLIC)

    cabinetStockList: CabinetStocks @cacheControl (maxAge: 3600 , scope: PUBLIC)
    cabinetStock(id: String): CabinetStocks @cacheControl (maxAge: 3600 , scope: PUBLIC)
    cabinetStockHistory(id: String): CabinetStockHistory @cacheControl (maxAge: 3600 , scope: PUBLIC)

    login(data: Member!): Response
    verify: VerifyResponse

    tracingStock: TracingStock
    tracingStockId: [String]

    getNote(stockId: String): Note

    record: [StockRecord]
  }

  type Mutation {

    register(data: Member!): Response

    updateTracingStock(id: String!): Boolean

    createNote(stockId: String!, content: String!): String
    updateNote(noteId: String!, content: String!): String
    deleteNote(noteId: String!): String

    updateRecord(content: String!): Boolean
  }
`;



export default QueryTypeDefs;