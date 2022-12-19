declare interface StockBasic
{
  id: string;
  name: string;
  type: string;
  flatPrice: number;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  diffPrice: number;
  diffOfPercentage: number;
  tradingVolumn: number;
  tradingShares: number;
  tradingUnits: number;
  capital: number;
  market: string;
}

declare interface StockPriceHistory
{
  date: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  reductionPrice: number;
  volumn: number;
}

declare interface StockMonthRevenue
{
    date: string;
    id: string;
    nowMonthRevenue: number;
    previousMonthRevenue: number;
    previousYearRevenue: number;
    previousMonthChangeRate: number;
    previousYearChangeRate: number;
    accumulation: number;
    previousAccumulation: number;
    accumulationChangeRate: number;
    remark: string;
}

declare interface StockInvestmentMechanism
{
  id: string;
  name: string;
  foreignInvestment: number;
  credit: number;
  selfEmployed: number;
  threeMechanism: number;
}

declare interface StockVolumnGroup {
  type: string;
  tradingVolumn: number;
  tradingVolumnPoint: number; 
}