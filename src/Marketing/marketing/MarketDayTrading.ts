
import _ from 'lodash';
import MarketAbstract from '@/Marketing/marketing/MarketAbstract';

class MarketDayTrading extends MarketAbstract<DaytradingType>
{

  public arrangeData() {

    this.data = {
      tradingStock: this.request.marketDayTrading.data[0],
      tradingStockProporation: this.request.marketDayTrading.data[1],
      buyStock: this.request.marketDayTrading.data[2],
      buyStockProporation: this.request.marketDayTrading.data[3],
      sellStock: this.request.marketDayTrading.data[4],
      sellStockProporation: this.request.marketDayTrading.data[5]
    };
  }
}

export default MarketDayTrading;