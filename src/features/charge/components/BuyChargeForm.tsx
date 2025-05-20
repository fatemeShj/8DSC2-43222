"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buyChargeSchema } from "../schemas/buyChargeSchema";
import ToggleSwitch from "@/components/ToggleSwitch";
import { calculatePriceWithTax } from "@/utils/tax";
import chargeOptions from "@/data/chargeOptions";
import InvoiceSummary from "./InvoiceSummary";
import Toast from "@/components/Toast";
import { BankResponse } from "@/types/bankValidation";
import PaymentGateway from "./PaymentGateway";
import { isBankValidation } from "@/guards/isBankValidation";
import { toPersianNumbers } from "@/utils/PersianNumber";
// import { submitBuyCharge } from "@/service/submitBuyCharge";

type BuyChargeFormValues = z.infer<typeof buyChargeSchema>;

export default function ChargeForm() {
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const [bankResponse, setBankResponse] = useState<boolean | null>(null);
  const [bankInfo, setBankInfo] = useState<BankResponse | null>(null);
  const [selectedBankName, setSelectedBankName] = useState<string>("---");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<BuyChargeFormValues>({
    resolver: zodResolver(buyChargeSchema),
    defaultValues: {
      type: "اعتباری",
      amazingCharge: false,
      phoneNumber: "",
      amount: 20000,
      email: " ",
    },
  });

  const simTypeMap = {
    دائمی: "postpaid",
    اعتباری: "prepaid",
  } as const;

  type SimTypeMapped = (typeof simTypeMap)[keyof typeof simTypeMap];

  const onSubmit = async (data: BuyChargeFormValues) => {
    console.log("hi");
    try {
      const payload: {
        channel: string;
        sim_type: SimTypeMapped;
        amount: number;
        msisdn: string;
        is_wow: boolean;
      } = {
        channel: "eShop",
        sim_type: simTypeMap[data.type],
        amount: data.amount,
        msisdn: data.phoneNumber,
        is_wow: data.amazingCharge,
      };

      setBankResponse(null);
      const response = await fetch("/api/submit-buy-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const finalData: BankResponse = await response.json();

      if (finalData.result_code !== 0) {
        setBankResponse(false);
        setToast({
          message: finalData.info.fa.message,
          type: "error",
        });
      } else {
        setBankInfo(finalData);
        setBankResponse(true);
      }
    } catch (error) {
      setToast({
        message: error as string,
        type: "error",
      });
    }
  };

  const handleBankSelect = (bankName: string) => {
    if (bankInfo && isBankValidation(bankInfo)) {
      const selectedBank = bankInfo.banks.find(
        (bank) => bank.bankName.fa === bankName
      );
      if (selectedBank) {
        setSelectedBankName(selectedBank.bankName.fa);
      }
    } else {
      console.warn("اطلاعات بانک معتبر نیست");
    }
  };

  const simType = watch("type");
  const isAmazing = watch("amazingCharge");
  const amount = watch("amount");
  const phone = watch("phoneNumber");
  const email = watch("email");

  const invoiceDetails = [
    { label: "نوع سیم‌کارت", value: simType, bold: true },
    { label: "مستقیم به شماره", value: phone || "---" },
    {
      label: "مبلغ شارژ",
      value: amount
        ? `${toPersianNumbers(
            calculatePriceWithTax(amount).toLocaleString()
          )} ریال`
        : "0 ریال",
      bold: true,
    },
    {
      label: "نوع شارژ",
      value: isAmazing ? "شگفت‌انگیز" : "معمولی",
      bold: true,
    },
    { label: "ایمیل", value: email || "---", bold: true },
    { label: "نام درگاه پرداخت", value: selectedBankName || "---", bold: true },
  ];
  useEffect(() => {
    if (isAmazing) {
      const firstAmazingOption = chargeOptions.find(
        (opt) =>
          opt.amazingAvailable && (opt.type === "both" || opt.type === simType)
      );

      if (firstAmazingOption) {
        setValue("amount", firstAmazingOption.amount, {
          shouldValidate: true,
        });
        setShowCustomAmount(false);
      }
    }
  }, [isAmazing, simType, setValue]);
  return (
    <div className="grid grid-cols-12 gap-4 max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-md">
      <div className="col-span-12 md:col-span-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex w-full max-w-5xl overflow-hidden justify-between items-centew-full space-y-6 px-6 py-8"
          noValidate
        >
          <div className="flex flex-col space-y-6 mx-auto">
            <h1 className="font-bold text-center text-lg sm:text-xl">
              خرید آنلاین شارژ ایرانسل
            </h1>

            <div className="flex flex-col items-center gap-2">
              <div className="text-[#8B8B8D] text-sm sm:text-base">
                نوع سیم‌کارت
              </div>
              <div className="border border-gray-200 rounded-full flex gap-2">
                <button
                  type="button"
                  onClick={() => setValue("type", "اعتباری")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    simType === "اعتباری" ? "bg-primary text-black" : "bg-white"
                  }`}
                >
                  اعتباری
                </button>
                <button
                  type="button"
                  onClick={() => setValue("type", "دائمی")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    simType === "دائمی" ? "bg-primary text-black" : "bg-white"
                  }`}
                >
                  دائمی
                </button>
              </div>
            </div>
            {errors.type && (
              <p className="text-red-600 text-xs text-center">
                {errors.type.message}
              </p>
            )}

            <div className="flex items-center justify-center gap-2">
              <Controller
                name="amazingCharge"
                control={control}
                render={({ field }) => (
                  <ToggleSwitch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <label className="text-sm text-[#212529]">شارژ شگفت‌انگیز</label>
            </div>

            <input
              type="text"
              placeholder="شماره تلفن همراه"
              className={`w-full p-3 text-right bg-secondary-irc-gray rounded-full text-sm
    border ${errors.phoneNumber ? "border-red-500" : "border-secondary"}`}
              {...register("phoneNumber")}
            />

            <div className="text-sm text-[#8B8B8D]">مبلغ شارژ</div>
            <div className="grid grid-cols-3 gap-2">
              {chargeOptions.map((opt) => {
                const isDisabled =
                  (opt.type !== "both" && opt.type !== simType) ||
                  (isAmazing && !opt.amazingAvailable);

                return (
                  <button
                    key={opt.amount}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) {
                        setValue("amount", opt.amount, {
                          shouldValidate: true,
                        });
                        setShowCustomAmount(false);
                      }
                    }}
                    className={`px-2 py-2 rounded-full text-sm
                    ${amount === opt.amount ? "bg-primary" : "bg-gray-200"}
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-yellow-100"
                    }
                  `}
                  >
                    {toPersianNumbers(opt.amount.toLocaleString())} ریال
                  </button>
                );
              })}

              <button
                type="button"
                disabled={isAmazing}
                className={`px-4 py-2 rounded-full text-sm ${
                  isAmazing
                    ? "opacity-50 cursor-not-allowed bg-gray-200"
                    : "bg-gray-200 hover:bg-yellow-100"
                }`}
                onClick={() => {
                  if (!isAmazing) setShowCustomAmount(true);
                }}
              >
                سایر مبالغ
              </button>
            </div>

            {showCustomAmount && (
              <input
                type="number"
                placeholder="مبلغ دلخواه (ریال)"
                className="w-full p-3 border border-secondary text-right bg-secondary-irc-gray rounded-full text-sm"
                {...register("amount", { valueAsNumber: true })}
              />
            )}
            {errors.amount && (
              <p className="text-red-600 text-xs">{errors.amount.message}</p>
            )}

            <input
              type="email"
              placeholder="ایمیل (اختیاری)"
              className={`w-full p-3 text-right bg-secondary-irc-gray rounded-full text-sm
    border ${errors.email ? "border-red-500" : "border-secondary"}`}
              {...register("email")}
            />

            {bankResponse && bankInfo && (
              <PaymentGateway bankInfo={bankInfo} onSelect={handleBankSelect} />
            )}

            <button
              type="submit"
              className="w-full bg-primary text-black font-semibold p-3 rounded-full hover:bg-yellow-300 transition text-sm"
            >
              انتخاب بانک و پرداخت
            </button>

            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
          </div>
        </form>
      </div>
      <div className="col-span-12 md:col-span-5 px-6 py-8">
        <InvoiceSummary details={invoiceDetails} />
      </div>
    </div>
  );
}
