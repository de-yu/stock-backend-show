
import _ from 'lodash';
import MarketAbstract from '@/Marketing/marketing/MarketAbstract';

class MarketInvestmentMechanism extends MarketAbstract<MarketInvestmentMechanismType[]>
{

  public arrangeData() {
    this.data = [];

    _.forEach(this.request.marketInvestmentMechanism.data , (item: any) => {
      this.data.push({
        name: item[0],
        buy: item[1],
        sell: item[2],
        gap: item[3],
      });
    });
  }
}

export default MarketInvestmentMechanism;