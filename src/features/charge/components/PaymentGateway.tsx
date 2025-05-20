import { useState } from "react";
import { isBankValidation } from "@/guards/isBankValidation";
import { BankResponse } from "@/types/bankValidation";
import Image from "next/image";

interface Props {
  bankInfo: BankResponse | null;
  onSelect: (bankCode: string) => void;
}

const PaymentGateway = ({ bankInfo, onSelect }: Props) => {
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);

  if (!bankInfo || !isBankValidation(bankInfo)) return null;

  const handleClick = (bankName: string) => {
    setSelectedBankCode(bankName);
    onSelect(bankName);
  };

  return (
    <div className="bg-secondary-irc-gray p-4 flex flex-col justify-between items-center gap-4 rounded-lg text-sm">
      <div>انتخاب درگاه پرداخت :</div>
      <div className="flex flex-wrap gap-4">
        {bankInfo.banks.map((bank) => (
          <div
            key={bank.bankCode}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleClick(bank.bankName.fa)}
          >
            <Image
              src={bank.bankIcon}
              alt={bank.bankName.fa}
              width={50}
              height={50}
              className={`transition-all duration-300 ${
                selectedBankCode === bank.bankCode
                  ? ""
                  : "grayscale hover:grayscale-0"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentGateway;
