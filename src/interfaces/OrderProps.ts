
export interface OrderDetailProps {
  orderId: number;
  orderStatus: string;
  orderRequestDate: string;
  orderUpdateDate: string;
}

export interface OrderDetailModalProps extends OrderDetailProps {
  onUpdateStatus: (orderId: number, status: string) => void;
}