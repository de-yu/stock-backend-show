
import _ from 'lodash';
import {defaultNaN , defaultUndefined} from '@/utility/Util';
import MarketingStockAbstract from "@/Stock/MarketingStock/MarketingStockAbstract";

class MarketingStockInvestmentMechanism extends MarketingStockAbstract<StockInvestmentMechanism[]>
{
  public arrangeData(): void {
    this.data = [];
    
    _.forEach(this.request.stockInvestmentMechanism.data , (value: any, index: number) => {

        this.data.push({
          id: value[0],
          name: value[1],
          foreignInvestment: value[4],
          credit: value[7],
          selfEmployed: value[14],
          threeMechanism: value[15]
        })
      
    });
  }

  public filterStock()
  {
    this.data = _.filter(this.data , (stock: StockInvestmentMechanism) => {
      return stock.id === this.condition.id;
    })

    if(this.data.length === 0) {
      this.data = [{
        id:  this.condition.id,
        name: '',
        foreignInvestment: 0,
        credit: 0,
        selfEmployed: 0,
        threeMechanism: 0
      }]
    }
  }

}

export default MarketingStockInvestmentMechanism;