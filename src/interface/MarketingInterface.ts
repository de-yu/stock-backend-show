declare interface MarketDealType
{
  dealSumOfShare: number;
  dealSumOfMoney: number;
  dealSumOfTransaction: number;
} 

declare interface MarketHistoryType
{
  date: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  reductionPrice: number;
  volumn: number;
}

declare interface MarketNoticeType
{
  date: string;
  stockNumber: string;
  stockName: string;
  sumOfTimes: number;
  noticeInfo: string;
}

declare interface MarketRiseFallType
{
  sumOfRise: number;
  sumOfRiseLimit: number;
  sumOfDown: number;
  sumOfDownLimit: number;
  sumOfEqual: number;
}

declare interface MarketStatisticType
{
  marketName: string;
  closingPrice: number;
  pointOfMarket: number;
  percentageOfMarket: number;
}

declare interface MarketPriceType
{
  flatPrice: number;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  pointOfMarket: number;
  percentageOfMarket: number;
}

declare interface MarketInvestmentMechanismType
{
  name: string;
  buy: number;
  sell: number;
  gap: number;
}

declare interface DaytradingType
{
  tradingStock: number;
  tradingStockProporation: number;
  buyStock: number;
  buyStockProporation: number;
  sellStock: number;
  sellStockProporation: number;
}