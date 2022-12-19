
import _ from 'lodash';
import {defaultNaN , defaultUndefined} from '@/utility/Util';
import MarketingStockAbstract from "@/Stock/MarketingStock/MarketingStockAbstract";

class MarketingStockBasic extends MarketingStockAbstract<StockBasic[]>
{
  public arrangeData(): void {
    this.data = [];
    
    _.forEach(this.request.stockBasic.data.data as string[][], (value: string[] , index: number) =>{
      if(index > 0 && !_.isUndefined(value[0]))
      {
        this.data.push({
          id: value[0],
          name: value[1],
          type:  '', //defaultUndefined(this.request.stockType.data[value[0]] , "") as string,
          flatPrice: defaultNaN(parseFloat(value[7]) - parseFloat(value[8]) , 0),
          openingPrice: defaultNaN(parseFloat(value[4]) , 0),
          highestPrice: defaultNaN(parseFloat(value[5]) , 0),
          lowestPrice: defaultNaN(parseFloat(value[6]) , 0),
          closingPrice: defaultNaN(parseFloat(value[7]) , 0),
          diffPrice: defaultNaN(parseFloat(value[8]) , 0),
          diffOfPercentage: defaultNaN((parseFloat(value[8])/(parseFloat(value[7]) - parseFloat(value[8])))*100 , 0),
          tradingVolumn: defaultNaN(parseInt(value[3]) , 0),
          tradingShares: defaultNaN(parseInt(value[2]) , 0),
          tradingUnits: defaultNaN(parseInt(value[9]) , 0),
          capital: 0, //defaultUndefined(this.request.stockCapital.data[value[0]] , 0) as number,
          market: StockType.market
         });
      }
    });
  }

  public addStockType() {
    _.forEach(this.data , (item: StockBasic) => {
      item.type = defaultUndefined(this.request.stockType.data[item.id] , "");
    });
  }

  public addStockCapital() {
    _.forEach(this.data , (item: StockBasic) => {
      item.capital = defaultUndefined(this.request.stockCapital.data[item.id] , 0);
    });
  }

  public filterStock()
  {
    this.data = _.filter(this.data , (stock: StockBasic) => {
      return this.condition.id.includes(stock.id) as boolean;
    })
  }
}

export default MarketingStockBasic;