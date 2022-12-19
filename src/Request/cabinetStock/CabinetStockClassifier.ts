import _ from 'lodash';
import axios from 'axios';
import cheerio from 'cheerio';
import iconv  from 'iconv-lite';
import URL from '@/globalParameter/DataUrl';
import AnalysisChain from '@/utility/AnalysisChain';
import RequestAbstract from '@/Request/RequestAbstract';

class CabinetStockClassifier extends RequestAbstract
{
  public async getRequest()
  {
    if(this.request.status === Status.none) {
      await axios.get(URL.CABINET_STOCK_CLASSIFIER, {
        responseType: 'arraybuffer',
        transformResponse: [ (data) => {
          return iconv.decode(Buffer.from(data), 'big5')
        }]
      }).then((response: any) => {
        this.saveCache(Status.Analysis , response);
      });

    }
  }

  public executeAnalysis() {

    const data = cheerio.load(this.request.data.data);
    const td: any = data('.h4 tr td');
    const temp: any = {};

    /*
      * 
      * i*10 + 2  stocknumber
      * i*10 + 3  stockname
      * i*10 + 6  stockclass
      */
    let stocknumber: any,stockname: any,stockclass: any;

    for(var i=1;i<td.length/10;i++)
    {
        stocknumber = _.trim(td[i*10+2]['children'][0]['data']);
        stockclass = td[i*10+6]['children'][0]['data'];
        temp[stocknumber] = stockclass;
    }
    this.request.data = temp;
  }
}

export default CabinetStockClassifier;