"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buyChargeSchema } from "../schemas/buyChargeSchema";

type BuyChargeFormValues = z.infer<typeof buyChargeSchema>;

const chargeOptions = [10000, 20000, 50000, 100000, 200000];

export default function ChargeForm() {
  const [showCustomAmount, setShowCustomAmount] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row w-full max-w-5xl"
        noValidate
      >
        <div className="w-full md:w-1/2 p-6 space-y-6">
          <h2 className="text-lg font-bold text-center">
            خرید آنلاین شارژ ایرانسل
          </h2>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setValue("type", "اعتباری")}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                simType === "اعتباری" ? "bg-primary text-black" : "bg-gray-200"
              }`}
            >
              اعتباری
            </button>
            <button
              type="button"
              onClick={() => setValue("type", "دائمی")}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                simType === "دائمی" ? "bg-primary text-black" : "bg-gray-200"
              }`}
            >
              دائمی
            </button>
          </div>
          {errors.type && (
            <p className="text-red-600 text-xs text-center">
              {errors.type.message}
            </p>
          )}

          <div className="flex items-center justify-center gap-2">
            <label>شارژ شگفت‌انگیز</label>
            <input type="checkbox" {...register("amazingCharge")} />
          </div>

          <input
            type="text"
            placeholder="شماره تلفن همراه"
            className="w-full p-2 border rounded-lg text-right"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-xs">{errors.phoneNumber.message}</p>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {chargeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setValue("amount", opt, { shouldValidate: true });
                  setShowCustomAmount(false);
                }}
                className={`px-4 py-2 rounded-full text-sm ${
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
              className="w-full p-2 border rounded-lg text-right"
              {...register("amount", { valueAsNumber: true })}
            />
          )}
          {errors.amount && (
            <p className="text-red-600 text-xs">{errors.amount.message}</p>
          )}

          <input
            type="email"
            placeholder="ایمیل (اختیاری)"
            className="w-full p-2 border rounded-lg text-right"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            انتخاب بانک و پرداخت
          </button>
        </div>
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-center">فاکتور نهایی</h2>
          <div className="text-sm space-y-2 text-gray-700">
            <div>
              نوع سیم‌کارت: <span className="font-bold">{simType}</span>
            </div>
            <div>مستقیم به شماره: {phone || "---"}</div>
            <div>
              مبلغ شارژ:{" "}
              <span className="font-bold">
                {amount ? (amount * 1.1).toLocaleString() : 0} ریال
              </span>
            </div>
            <div>نوع شارژ: {isAmazing ? "شگفت‌انگیز" : "معمولی"}</div>
            <div>ایمیل: {email || "---"}</div>
            <div>نام درگاه پرداخت: ---</div>
          </div>
        </div>
      </form>
    </div>
  );
}
