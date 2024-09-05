export type TButton = {
  text: string;
  link: string;
};

export type TBanner = {
  serial:number;
  bannerName:string;
  img: string;
  isActive: boolean;
  direction: 'right' | 'left';
  title: string;
  description: string;
  button: TButton[];
};
