import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import URL from '@/globalParameter/DataUrl';
import AnalysisChain from '@/utility/AnalysisChain';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketingStockHistory extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {

      const startTime = parseInt(moment().format('X')) - 24*3600*730;
      const endTime = moment().format('X');
      // 取得一年前的 unix 的秒數 和 現在 unix 的秒數
      const urlHistory = _.template(URL.STOCK_HISTORY);
      await axios.get(urlHistory({id: this.parameters.id , startTime , endTime})).then((response: any) => {
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

export default MarketingStockHistory;