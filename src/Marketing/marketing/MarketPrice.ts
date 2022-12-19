import _ from 'lodash';
import MarketAbstract from '@/Marketing/marketing/MarketAbstract';
import {defaultNaN} from '@/utility/Util';

class MarketPrice extends MarketAbstract<MarketPriceType>
{
  public arrangeData(): any {
    const last: string[] = _.last(this.request.marketHistory.data as string[][]) as string[];
    const lastTwo: string[] = _.nth(this.request.marketHistory.data as string[][] , -2) as string[];

    this.data = {
      flatPrice: defaultNaN(parseFloat(lastTwo[4]), 0),
      openingPrice: defaultNaN(parseFloat(last[1]), 0),
      highestPrice: defaultNaN(parseFloat(last[2]), 0),
      lowestPrice: defaultNaN(parseFloat(last[3]), 0),
      closingPrice: defaultNaN(parseFloat(last[4]), 0),
      pointOfMarket: defaultNaN(parseFloat((parseFloat(last[4]) - parseFloat(lastTwo[4])).toFixed(2)), 0),
      percentageOfMarket: parseFloat(defaultNaN(((parseFloat(last[4]) - parseFloat(lastTwo[4]))/parseFloat(lastTwo[4]) * 100), 0).toFixed(2))
    };
  }
}

export default MarketPrice;