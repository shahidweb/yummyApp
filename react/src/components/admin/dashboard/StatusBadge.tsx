import { ORDER_STATUS } from "../../../shared/constants/order";

type Props = {
  status: number;
};

function StatusBadge({ status }: Props) {
  if (!status) return;

  const orderStatus = ORDER_STATUS.find(sts => sts.value === status);

  return (
    <span className={`text-xs rounded-full font-medium ${orderStatus?.textColor}`}>
      {orderStatus?.label}
    </span>
  );
}

export default StatusBadge;