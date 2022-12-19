import _ from 'lodash';
import MarketAbstract from '@/Marketing/marketing/MarketAbstract';

class MarketRiseFall extends MarketAbstract<MarketRiseFallType>
{
  public arrangeData() {

    this.data = {  
      sumOfRise: parseInt(this.request.marketRiseFall.data[2][2]),
      sumOfRiseLimit: parseInt(this.request.marketRiseFall.data[2][3]),
      sumOfDown: parseInt(this.request.marketRiseFall.data[2][4]),
      sumOfDownLimit: parseInt(this.request.marketRiseFall.data[2][5]),
      sumOfEqual: parseInt(this.request.marketRiseFall.data[2][6])
    };
  }
}

export default MarketRiseFall;