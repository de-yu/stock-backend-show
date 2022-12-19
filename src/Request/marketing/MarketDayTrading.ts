
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import URL from '@/globalParameter/DataUrl';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketDayTrading extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
      let date = "";
      let back = 0;
      const urlTrading= _.template(URL.MARKET_DAY_TRADING);

      while(true) {
        date = moment().subtract(back, 'months').format('YYYYMMDD');
        let response = await axios.get(urlTrading({date}));
        if(response.data.stat === 'OK'){
          this.saveCache(Status.Analysis , response);
          break;
        }
        back++;
      }
    }
  }

  public executeAnalysis() {
    const last: string[] = _.last(this.request.data.data.data) as string[];
    let temp: any = [
      Number(_.replace(last[1],new RegExp(",","g"),"")),
      Number(_.replace(last[2],new RegExp(",","g"),"")),
      Number(_.replace(last[3],new RegExp(",","g"),"")),
      Number(_.replace(last[4],new RegExp(",","g"),"")),
      Number(_.replace(last[5],new RegExp(",","g"),"")),
      Number(_.replace(last[6],new RegExp(",","g"),"")),
    ];
    this.request.data = temp;
  }
}

export default MarketDayTrading;