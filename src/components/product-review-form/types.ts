export type ProductReviewFormType = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type ProductReviewFormProps = {
  isActive: boolean;
  setActive: (item: boolean) => void;
  camera: number;
  setActiveModal: (item: boolean) => void;
  scroll: number;
}
