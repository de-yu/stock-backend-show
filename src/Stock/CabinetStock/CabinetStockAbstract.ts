
abstract class CabinetStockAbstract<T> {

  protected data: T;
  protected request: RequestResponseList;
  protected condition: CommonObject = {};

  public constructor (request: RequestResponseList , condition: CommonObject = {}) {
    this.request = request;
    this.condition = condition;
  }
  public abstract arrangeData(): void;

  public getData(): T {
    return this.data;
  }
}

export default CabinetStockAbstract;