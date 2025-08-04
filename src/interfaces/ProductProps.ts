export interface ProductProps {
  id: any;
  name: string;
  image: string;
  price: number;
  description: string;
}

export interface ProductItemProps extends ProductProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}