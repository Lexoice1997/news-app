interface Res {
  ok: boolean
  status: number
  statusText: string
}

interface IGetResp {
  endpoint: string
  options?: object
}

interface OptionLoader {
    [key: string]: string
}

class Loader {
  baseLink: string
  options: OptionLoader

  constructor(baseLink: string, options: OptionLoader) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp({endpoint, options = {}}: IGetResp, callback: <IView>(data: IView) => void = (): void => {
            console.error('No callback for GET response');
          }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: object, endpoint: string): string {
    const urlOptions = {...this.options, ...options};
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: string, endpoint: string, callback: <IView> (data: IView) => void, options = {}): void {
    fetch(this.makeUrl(options, endpoint), {method})
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
