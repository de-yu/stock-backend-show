
import moment from 'moment';


abstract class RequestAbstract implements RequestInterface {

  protected parameters: any = {};
  protected timeout: number = 0;
  protected cacheTime: string = "";
  protected request: RequestResponse = {
    status: "",
    data: {}
  };

  public constructor(parameters: any = {}){
    this.parameters = parameters;
  }

  public resetCache(minutes: number): void {
    if(moment(this.cacheTime).add(minutes , 'm').isBefore(moment())) {
      this.request = {
        status: "",
        data: {}
      };
    }
  }

  public saveCache(status: string, data: any): void {
    this.cacheTime = moment().format();
    this.request = {
      status,
      data
    };
  }

  public getData() {
    return this.request;
  }

  public abstract getRequest(): any;
  public analysisData(): void {
    if(this.request.status === Status.Analysis) {
      this.executeAnalysis();
      this.request.status = Status.Success;
    }
  }
  public abstract executeAnalysis(): any;
}

export default RequestAbstract;