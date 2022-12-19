
import _ from 'lodash';
import { defaultNaN } from '@/utility/Util';
import MarketingStockAbstract from "@/Stock/MarketingStock/MarketingStockAbstract";

class MarketingStockHistory extends MarketingStockAbstract<StockPriceHistory[]>
{
  public arrangeData(): void {

    this.data = [];

    _.forEach(this.request.stockHistory.data as string[][] , (value: string[], index: number) => {
      if(index > 0) {
        this.data.push({
          date: value[0],
          openingPrice: defaultNaN(parseFloat(value[1]) , 0),
          highestPrice: defaultNaN(parseFloat(value[2]) , 0),
          lowestPrice: defaultNaN(parseFloat(value[3]) , 0),
          closingPrice: defaultNaN(parseFloat(value[4]) , 0),
          reductionPrice: defaultNaN(parseFloat(value[5]) , 0),
          volumn: defaultNaN(parseFloat(value[6]) , 0),
        })
      }
    });
  }

}

export default MarketingStockHistory;