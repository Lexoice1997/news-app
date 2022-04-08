import News from './news/news';
import Sources from './sources/sources';
import { ISource } from "./sources/sources";
import { INews } from "./news/news";

export interface IView {
    articles?: Array<INews>
    sources?: Array<ISource>
}

export class AppView {
    news: News
    sources: Sources

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IView): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IView): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
