import { isBankValidation } from "@/guards/isBankValidation";
import { BankResponse } from "@/types/bankValidation";
import Image from "next/image";

const PaymentGateway = ({ bankInfo }: { bankInfo: BankResponse | null }) => {
  if (!bankInfo || !isBankValidation(bankInfo)) return null;

  return (
    <div className="bg-secondary-irc-gray p-4 flex flex-col gap-4 rounded-lg">
      <div>انتخاب درگاه پرداخت :</div>
      <div className="flex flex-wrap gap-4">
        {bankInfo.banks.map((bank) => (
          <div key={bank.bankCode} className="flex items-center gap-2">
            <Image
              src={bank.bankIcon}
              alt={bank.bankName.fa}
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentGateway;
