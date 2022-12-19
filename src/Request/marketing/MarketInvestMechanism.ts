
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import URL from '@/globalParameter/DataUrl';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketInvestMechanism extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
      let date = "";
      let back = 0;
      const urlHistory = _.template(URL.MARKET_INVESTMENT_MECHANISM);

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
        Number(_.replace(item[1],new RegExp(",","g"),"")),
        Number(_.replace(item[2],new RegExp(",","g"),"")),
        Number(_.replace(item[3],new RegExp(",","g"),""))
      ])
    });

    this.request.data = temp;
  }
}

export default MarketInvestMechanism;