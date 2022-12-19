
import _ from 'lodash';
import {defaultNaN , defaultUndefined} from '@/utility/Util';
import MarketingStockAbstract from "@/Stock/MarketingStock/MarketingStockAbstract";

class MarketingStockVolumnGroup extends MarketingStockAbstract<StockVolumnGroup[]>
{

  private sum = 0;
  public arrangeData(): void {
    this.data = [];
    
    _.forEach(this.request.stockBasic.data.data as string[][], (value: string[] , index: number) =>{
      if(index > 0)
      {
        this.data.push({
          type:  defaultUndefined(this.request.stockType.data[value[0]] , "") as string,
          tradingVolumn: defaultNaN(parseInt(value[3]) , 0),
          tradingVolumnPoint: 0
         });

         this.sum += defaultNaN(parseInt(value[3]) , 0);
      }
    });
  }

  public groupData()
  {
    const temp = _.groupBy(this.data , 'type');
    this.data = [];

    _.forEach(temp, (item: any, key: string) => {

      const sumtradingVolumn = _.sum(_.map(item, 'tradingVolumn'));
      this.data.push({
        type: key,
        tradingVolumn:sumtradingVolumn,
        tradingVolumnPoint: (sumtradingVolumn/this.sum)*100
      })
    })

    this.data = _.reverse(_.sortBy(this.data, 'tradingVolumnPoint'));
  }
}

export default MarketingStockVolumnGroup;