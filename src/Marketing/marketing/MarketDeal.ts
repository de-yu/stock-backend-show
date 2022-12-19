
import _ from 'lodash';
import MarketAbstract from '@/Marketing/marketing/MarketAbstract';

class MarketDeal extends MarketAbstract<MarketDealType>
{

  public arrangeData() {
    const lastest: string[] = _.nth(this.request.marketDeal.data as string[][], -2) as string[];

    this.data = {
      dealSumOfShare: parseInt(lastest[1]),
      dealSumOfMoney: parseInt(lastest[2]),
      dealSumOfTransaction: parseInt(lastest[3])
    };
  }
}

export default MarketDeal;