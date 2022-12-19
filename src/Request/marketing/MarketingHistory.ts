
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import URL from '@/globalParameter/DataUrl';
import AnalysisChain from '@/utility/AnalysisChain';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketingHistory extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
      const startTime = parseInt(moment().format('X')) - 24*3600*365;
      const endTime = moment().format('X');
      const urlHistory = _.template(URL.MARKET_HISTORY);
      await axios.get(urlHistory({startTime , endTime})).then((response: any) => {
         this.saveCache(Status.Analysis , response);
       });
     }
  }

  public executeAnalysis() {

    let temp = [[]];
    temp = AnalysisChain.setData(this.request.data.data)
    .splitByLine()
    .delDoubleQuotes()
    .splitByDot()
    .getData();

    this.request.data = temp;
  }
}

export default MarketingHistory;