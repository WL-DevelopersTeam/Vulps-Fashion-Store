const OrderStatusTimeline = ({ status }) => {
  const steps = ["PENDING", "ACCEPTED", "DELIVERED"];

  return (
    <div className="flex items-center gap-4 mt-3">
      {steps.map((step, index) => {
        const isCompleted =
          steps.indexOf(status) >= index;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full
                ${
                  isCompleted
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
            />

            <span
              className={`text-xs font-medium
                ${
                  isCompleted
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
            >
              {step}
            </span>

            {index !== steps.length - 1 && (
              <div className="w-10 h-[2px] bg-gray-300" />
            )}
          </div>
        );
      })}

      {status === "DECLINED" && (
        <span className="ml-4 text-sm text-red-600 font-semibold">
          ❌ Order Declined
        </span>
      )}
    </div>
  );
};

export default OrderStatusTimeline;
