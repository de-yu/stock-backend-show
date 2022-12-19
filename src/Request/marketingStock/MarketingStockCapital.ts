
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import URL from '@/globalParameter/DataUrl';
import RequestAbstract from '@/Request/RequestAbstract';

class MarketingStockCapital extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
      let date = "";
      let back = 0;
      const urlReserve = _.template(URL.STOCK_FOREIGN_RESERVE);

      while(true) {
        date = moment().subtract(back, 'days').format('YYYYMMDD');
        let response = await axios.get(urlReserve({date}));
        if(response.data.stat === 'OK' && response.data.data.length > 0){
          this.saveCache(Status.Analysis , response);
          break;
        }
        back++;
      }
    }
  }

  public executeAnalysis() {
    let temp: any = {};
    _.forEach(this.request.data.data.data , (item: string[]) => {
      temp[item[0]] = Number(_.replace(item[3],new RegExp(",","g"),""));
    });

    this.request.data = temp;
  }
}

export default MarketingStockCapital;