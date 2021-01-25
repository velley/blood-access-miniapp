export interface BannerData {
  bannerId: number;
  imageUrl:string;
  relateType: 1 | 2;
  publisher: string;
  articleId: string;
  linkUrl: string;
  cdt: number;
}

export interface ArticleData {
  articleId: number;
  title: string;
  publisher: string;
  content: string;
  articleGroupId: string;
  cdt: string;
  imageUrl: string;
}