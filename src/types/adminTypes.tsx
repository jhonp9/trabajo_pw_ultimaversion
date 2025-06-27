export interface NewsItem {
    id: string;
    title: string;
    content: string;
    date: Date;
    image?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: Date;
  }
  
  export interface SalesData {
    months: string[];
    revenue: number[];
  }