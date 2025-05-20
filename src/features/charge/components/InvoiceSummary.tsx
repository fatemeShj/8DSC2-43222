import React from "react";

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
      <div className="hidden md:block w-full md:w-1/3 bg-secondary-irc-gray p-4 md:m-6 sm:p-6 space-y-4 rounded-lg">
        <h2 className="text-md sm:text-lg font-bold text-center bg-white p-4 rounded-lg">
          فاکتور نهایی
        </h2>

        <div className=" space-y-4 text-sm sm:text-base">
          {details.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="text-sm text-primary-irc-gray">{item.label}</div>
              <div className="text-base font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="block md:hidden  bg-[#fff5cc] border border-[#ffd733] rounded-lg text-[#212529] text-sm p-4 m-4">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center space-y-3"
          >
            <div className="">{item.label}</div>
            <div className="font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceSummary;
