
abstract class MarketingAbstract<T> {

  protected data: T;
  protected request: RequestResponseList;

  public constructor (request: RequestResponseList) {
    this.request = request;
  }
  public abstract arrangeData(): void;

  public getData(): T {
    return this.data;
  }
}

export default MarketingAbstract;