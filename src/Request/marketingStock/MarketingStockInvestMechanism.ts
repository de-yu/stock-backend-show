
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import URL from '@/globalParameter/DataUrl';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketingStockInvestMechanism extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
      let date = "";
      let back = 0;
      const urlHistory = _.template(URL.STOCK_INVESTMENT_MECHANISM);

      while(true) {
        date = moment().subtract(back, 'days').format('YYYYMMDD');
        let response = await axios.get(urlHistory({date}));

        if(response.data.stat === 'OK'){
          this.saveCache(Status.Analysis , response);
          break;
        }
        back++;
      }
     }
  }

  public executeAnalysis() {
    let temp: any = [];

    _.forEach(this.request.data.data.data , (item: string[]) => {
      temp.push([
        item[0],
        item[1].trim(),
        Number(_.replace(item[2],new RegExp(",","g"),"")), // 外資買進
        Number(_.replace(item[3],new RegExp(",","g"),"")), // 外資賣出
        Number(_.replace(item[4],new RegExp(",","g"),"")), // 外資買賣超
        Number(_.replace(item[8],new RegExp(",","g"),"")), // 投信買進
        Number(_.replace(item[9],new RegExp(",","g"),"")), // 投信賣出
        Number(_.replace(item[10],new RegExp(",","g"),"")), // 投信買賣超
        Number(_.replace(item[12],new RegExp(",","g"),"")), // 自營商買進(自行)
        Number(_.replace(item[13],new RegExp(",","g"),"")), // 自營商賣出(自行)
        Number(_.replace(item[14],new RegExp(",","g"),"")), // 自營商買賣超(自行)
        Number(_.replace(item[15],new RegExp(",","g"),"")), // 自營商買進 (避險)
        Number(_.replace(item[16],new RegExp(",","g"),"")), // 自營商賣出 (避險)
        Number(_.replace(item[17],new RegExp(",","g"),"")), // 自營商買賣超股數 (避險)
        Number(_.replace(item[11],new RegExp(",","g"),"")), // 自營商買賣超
        Number(_.replace(item[18],new RegExp(",","g"),"")) // 三大法人合計
      ])
    });
    this.request.data = temp;
  }
}

export default MarketingStockInvestMechanism;