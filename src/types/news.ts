export interface NewsItem {
  by: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface NewsState {
  newsDetail: NewsItem | null;
  news: NewsItem[];
  loading: boolean;
  error: boolean;
  loadingDetail: boolean;
  reload: boolean;
}
