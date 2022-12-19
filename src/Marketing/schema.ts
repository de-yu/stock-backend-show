import { gql } from 'apollo-server';

const MarketTypeDefs = gql`

  type MarketPriceType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    flatPrice: Float
    openingPrice: Float
    highestPrice: Float
    lowestPrice: Float
    closingPrice: Float
    pointOfMarket: Float
    percentageOfMarket: Float
  } 

  type MarketDealType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    dealSumOfShare: Float
    dealSumOfMoney: Float
    dealSumOfTransaction: Float
  } 

  type MarketHistoryType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    date: String
    openingPrice: Float
    highestPrice: Float
    lowestPrice: Float
    closingPrice: Float
    reductionPrice: Float
    volumn: Float
  }

  type MarketRiseFallType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    sumOfRise: Float
    sumOfRiseLimit: Float
    sumOfDown: Float
    sumOfDownLimit: Float
    sumOfEqual: Float
  }

  type MarketStatisticType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    marketName: String
    closingPrice: Float
    pointOfMarket: Float
    percentageOfMarket: Float
  }

  type MarketMechismType @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    name: String
    buy: Float
    sell: Float
    gap: Float
  }

  type MarketData @cacheControl (maxAge: 3600 , scope: PUBLIC){
    MarketPrice: MarketPriceType
    MarketDeal: MarketDealType
    MarketHistory: [MarketHistoryType]
    MarketRiseFall: MarketRiseFallType
    MarketStatistic: [MarketStatisticType]
  }

  type MarketInvestmentMechism @cacheControl (maxAge: 3600 , scope: PUBLIC){
    data: [MarketMechismType]
  }

  type MarketDayTrading @cacheControl (maxAge: 3600 , scope: PUBLIC)
  {
    tradingStock: Float
    tradingStockProporation: Float
    buyStock: Float
    buyStockProporation: Float
    sellStock: Float
    sellStockProporation: Float
  }
`;

export default MarketTypeDefs;