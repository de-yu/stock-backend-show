import _ from 'lodash';
import {defaultNaN} from '@/utility/Util';
import MarketAbstract from '@/Marketing/marketing/MarketAbstract';

class MarketStatistic extends MarketAbstract<MarketStatisticType[]>
{

  public arrangeData() {
    
    this.data = [];

    _.forEach(this.request.marketStatistics.data as string[][], (value: string[] , index: number) =>{
      if(index > 0)
      {
        this.data.push({
          marketName: value[0],
          closingPrice: defaultNaN(parseFloat(value[1]), 0),
          pointOfMarket: defaultNaN(parseFloat(value[2] + value[3]), 0),
          percentageOfMarket: defaultNaN(parseFloat(value[4]), 0),
        })
      }
    })
  }
}

export default MarketStatistic;