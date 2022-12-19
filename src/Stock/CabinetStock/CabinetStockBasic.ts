
import _ from 'lodash';
import {defaultNaN , defaultUndefined} from '@/utility/Util';
import CabinetStockAbstract from "@/Stock/CabinetStock/CabinetStockAbstract";

class CabinetStockBasic extends CabinetStockAbstract<StockBasic[]>
{
  public arrangeData(): void {
    this.data = [];
    
    _.forEach(this.request.cabinetBasic.data.data as string[][], (value: string[] , index: number) =>{
      if(index > 0 && !_.isUndefined(value[1]))
      {
        this.data.push({
          id: value[1],
          name: value[2],
          type:  '', //defaultUndefined(this.request.stockType.data[value[0]] , "") as string,
          flatPrice: defaultNaN(parseFloat(value[3]) - parseFloat(value[4]) , 0),
          openingPrice: defaultNaN(parseFloat(value[5]) , 0),
          highestPrice: defaultNaN(parseFloat(value[6]) , 0),
          lowestPrice: defaultNaN(parseFloat(value[7]) , 0),
          closingPrice: defaultNaN(parseFloat(value[3]) , 0),
          diffPrice: defaultNaN(parseFloat(value[4]) , 0),
          diffOfPercentage: defaultNaN((parseFloat(value[4])/(parseFloat(value[3]) - parseFloat(value[4])))*100 , 0),
          tradingVolumn: defaultNaN(parseInt(value[9]) , 0),
          tradingShares: defaultNaN(parseInt(value[8]) , 0),
          tradingUnits: defaultNaN(parseInt(value[10]) , 0),
          capital: defaultNaN(parseInt(value[13]) , 0),
          market: StockType.cabinet
         });
      }
    });
  }

  public addStockType() {
    _.forEach(this.data , (item: StockBasic) => {
      item.type = defaultUndefined(this.request.cabinetType.data[item.id] , "");
    });
  }

  public filterStock()
  {
    this.data = _.filter(this.data , (stock: StockBasic) => {
      return this.condition.id.includes(stock.id) as boolean;
    })
  }
}

export default CabinetStockBasic;