
declare interface RequestInterface {
  getRequest(data?: any): any;
  analysisData():any;
  getData(): any;
  resetCache(time: number): void;
  saveCache(status: string, data: any):void;
}

