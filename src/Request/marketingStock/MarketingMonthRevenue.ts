import _ from 'lodash';
import axios from 'axios';
import URL from '@/globalParameter/DataUrl';
import AnalysisChain from '@/utility/AnalysisChain';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketingMonthRevenue extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
     await axios.get(URL.STOCK_MONTH_REVENUE).then((response: any) => {
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

export default MarketingMonthRevenue;