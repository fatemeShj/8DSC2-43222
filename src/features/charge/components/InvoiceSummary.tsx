const InvoiceSummary = ({
  details,
}: {
  details: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <>
      <div className="hidden md:block w-full p-6 space-y-4 rounded-lg bg-secondary-irc-gray">
        <h2 className="text-md sm:text-lg font-bold text-center bg-white p-3 rounded-lg">
          فاکتور نهایی
        </h2>

        <div className="space-y-4 text-sm sm:text-base">
          {details.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="text-sm text-primary-irc-gray">{item.label}</div>
              <div className="text-base font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="block md:hidden bg-[#fff5cc] border border-[#ffd733] rounded-lg text-[#212529] text-sm p-4">
        {details.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <div>{item.label}</div>
            <div className="font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceSummary;
