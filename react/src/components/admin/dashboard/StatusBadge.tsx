type Props = {
  status: string;
};

function StatusBadge({ status }: Props) {

  const styles = {
    Pending:
      "text-yellow-100 text-yellow-700",

    Preparing:
      "text-blue-100 text-blue-700",

    Delivered:
      "text-green-100 text-green-700",

    Cancelled:
      "text-red-100 text-red-700",
  };

  return (
    <span
      className={`
        text-xs
        rounded-full
        font-medium
        ${styles[status as keyof typeof styles]}
      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;