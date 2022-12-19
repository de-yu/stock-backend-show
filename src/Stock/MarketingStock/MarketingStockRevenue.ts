
import _ from 'lodash';
import {defaultNaN , defaultUndefined} from '@/utility/Util';
import MarketingStockAbstract from "@/Stock/MarketingStock/MarketingStockAbstract";

class MarketingStockRevenue extends MarketingStockAbstract<StockMonthRevenue[]>
{
  public arrangeData(): void {
    this.data = [];

    _.forEach(this.request.stockRevenue.data as string[][] , (value: string[], index: number) => {
      if(index > 0) {
        this.data.push({
          date: value[1],
          id: value[2],
          nowMonthRevenue: defaultNaN(parseFloat(value[5]) , 0),
          previousMonthRevenue: defaultNaN(parseFloat(value[6]) , 0),
          previousYearRevenue: defaultNaN(parseFloat(value[7]) , 0),
          previousMonthChangeRate: defaultNaN(parseFloat(value[8]) , 0),
          previousYearChangeRate: defaultNaN(parseFloat(value[9]) , 0),
          accumulation: defaultNaN(parseFloat(value[10]) , 0),
          previousAccumulation: defaultNaN(parseFloat(value[11]) , 0),
          accumulationChangeRate: defaultNaN(parseFloat(value[12]) , 0),
          remark: value[13]
      })
      }
    });
  }

  public filterStock()
  {
    this.data = _.filter(this.data , (stock: StockMonthRevenue) => {
      return stock.id === this.condition.id;
    })
  }

}

export default MarketingStockRevenue;