import {gql} from 'apollo-server';

const marketStockTypeDefs = `

  type Stock
  {
    id: String
    name: String
    type: String
    flatPrice: Float
    openingPrice: Float
    highestPrice: Float
    lowestPrice: Float
    closingPrice: Float
    diffPrice: Float
    diffOfPercentage: Float
    tradingVolumn: Float
    tradingShares: Float
    tradingUnits: Float
    capital: Float
    market: String
  }

  type StockHistoryType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    date: String
    openingPrice: Float
    highestPrice: Float
    lowestPrice: Float
    closingPrice: Float
    reductionPrice: Float
    volumn: Float
  }

  type StockMonthRevenueType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    date: String
    id: Float
    nowMonthRevenue: Float
    previousMonthRevenue: Float
    previousYearRevenue: Float
    previousMonthChangeRate: Float
    previousYearChangeRate: Float
    accumulation: Float
    previousAccumulation: Float
    accumulationChangeRate: Float
    remark: String
  }


  type StockInvestmentMechanismType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    id: String
    name: String
    foreignInvestment: Float
    credit: Float
    selfEmployed: Float
    threeMechanism: Float
  }

  type StockCapitalType  @cacheControl (maxAge: 86400 , scope: PUBLIC)
  {
    id: String
    capital: String
  }

  type StockVolumnRank
  {
    type: String
    tradingVolumn:Float
    tradingVolumnPoint: Float
  }

  type Date
  {
    date: String
  }

  type MarketStocks 
  {
    headers: Date
    data: [Stock]
  }

  type MarketStock
  {
    headers: Date
    data: Stock
  }

  type MarketStockHistory
  {
    data: [StockHistoryType]
  }

  type MarketStockMonthRevenue
  {
    data: [StockMonthRevenueType]
  }

  type MarketStockInvestmentMechanism
  {
    data: [StockInvestmentMechanismType]
  }

  type TracingStock {
    data: [Stock]
  }

  type MarketStockVolumnRank {
    status: String
    data: [StockVolumnRank]
  }
`;

const cabinetStockTypeDefs = `

  type CabinetStocks {
    data: [Stock]
  }

  type CabinetStockHistory
  {
    data: [StockHistoryType]
  }

`;
const StockTypeDefs = gql`
${marketStockTypeDefs}
${cabinetStockTypeDefs}`;

export default StockTypeDefs;