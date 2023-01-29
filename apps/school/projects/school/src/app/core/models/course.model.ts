// Course Cap
export interface Course {
  id: string;
  cap: number;
  hide: boolean;
  comingSoon: boolean;
  free: boolean;
  tech: string;
  title: string;
  description?: string;
  img: string;
  courseName?: string;
}
