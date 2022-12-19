import _ from 'lodash';

class AnalysisChain{

  private data: any;

  public splitByLine(): AnalysisChain
  {
    this.data = this.data.replace(/\r/g, "");
    this.data = this.data.split('\n');
    return this;
  }

  public delDoubleQuotes(): AnalysisChain
  {
    this.data = _.map(this.data , (value: string) => {
      return value.replace(/\"/g, "");
    })
    return this;
  }

  public splitByDot(): AnalysisChain
  {
    this.data = _.map(this.data , (value: string) => {
      return value.split(',');
    })

    return this;
  }

  public setData(data: any): AnalysisChain {
    this.data = data;
    return this;
  }

  public getData(): any {
    return this.data;
  }

}

const chain = new AnalysisChain();

export default chain;