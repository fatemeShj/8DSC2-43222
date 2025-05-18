"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buyChargeSchema } from "../schemas/buyChargeSchema";
import IOSSwitch from "@/components/IOSSwitch";

type BuyChargeFormValues = z.infer<typeof buyChargeSchema>;

const chargeOptions = [10000, 20000, 50000, 100000, 200000];

export default function ChargeForm() {
  const [showCustomAmount, setShowCustomAmount] = useState(false);

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
      email: "",
    },
  });

  const onSubmit = (data: BuyChargeFormValues) => {
    alert(JSON.stringify(data, null, 2));
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
      value: amount ? `${(amount * 1.1).toLocaleString()} ریال` : "0 ریال",
      bold: true,
    },
    {
      label: "نوع شارژ",
      value: isAmazing ? "شگفت‌انگیز" : "معمولی",
      bold: true,
    },
    { label: "ایمیل", value: email || "---", bold: true },
    { label: "نام درگاه پرداخت", value: "---", bold: true },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row w-full max-w-5xl overflow-hidden"
        noValidate
      >
        <div className="w-full md:w-1/2 p-4 sm:p-6 space-y-6">
          <h1 className="font-bold text-center text-lg sm:text-xl">
            خرید آنلاین شارژ ایرانسل
          </h1>

          <div className="flex flex-col items-center gap-2">
            <div className="text-gray-400 text-sm sm:text-base">
              نوع سیم‌کارت
            </div>
            <div className="border border-gray-200 rounded-full flex gap-2 p-1">
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
                <IOSSwitch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <label>شارژ شگفت‌انگیز</label>
          </div>

          <input
            type="text"
            placeholder="شماره تلفن همراه"
            className="w-full p-3 border border-secondary text-right bg-secondary-irc-gray rounded-full text-sm"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-xs">{errors.phoneNumber.message}</p>
          )}

          <div className="text-sm">مبلغ شارژ</div>
          <div className="grid grid-cols-3 gap-2">
            {chargeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setValue("amount", opt, { shouldValidate: true });
                  setShowCustomAmount(false);
                }}
                className={`px-2 py-2 rounded-full text-sm  ${
                  amount === opt ? "bg-primary" : "bg-gray-200"
                }`}
              >
                {opt.toLocaleString()} ریال
              </button>
            ))}
            <button
              type="button"
              className="px-4 py-2 rounded-full text-sm bg-gray-200"
              onClick={() => setShowCustomAmount(true)}
            >
              سایر مبالغ
            </button>
          </div>

          {showCustomAmount && (
            <input
              type="number"
              placeholder="مبلغ دلخواه (ریال)"
              className="w-full p-3 border bg-secondary-irc-gray rounded-lg text-right text-sm"
              {...register("amount", { valueAsNumber: true })}
            />
          )}
          {errors.amount && (
            <p className="text-red-600 text-xs">{errors.amount.message}</p>
          )}

          <input
            type="email"
            placeholder="ایمیل (اختیاری)"
            className="w-full p-3 border border-secondary text-right bg-secondary-irc-gray rounded-full text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-black font-semibold p-3 rounded-full hover:bg-yellow-300 transition text-sm"
          >
            انتخاب بانک و پرداخت
          </button>
        </div>

        <div className="w-full md:w-1/2 bg-secondary-irc-gray p-4 md:m-6 sm:p-6 space-y-4 rounded-lg">
          <h2 className="text-md sm:text-lg font-bold text-center bg-white p-4 rounded-lg">
            فاکتور نهایی
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            {invoiceDetails.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="text-sm text-primary-irc-gray">
                  {item.label}
                </div>
                <div className={`text-base ${item.bold ? "font-bold" : ""}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
