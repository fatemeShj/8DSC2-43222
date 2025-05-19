import { z } from "zod";

export const buyChargeSchema = z.object({
  type: z.enum(["دائمی", "اعتباری"], {
    required_error: "نوع سیم‌کارت الزامی است",
  }),
  amazingCharge: z.boolean(),
  phoneNumber: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  amount: z
    .number({
      required_error: "مبلغ شارژ الزامی است",
      invalid_type_error: "مبلغ باید عددی باشد",
    })
    .min(10000, "حداقل مبلغ ۱۰,۰۰۰ ریال است")
    .max(900000, "حداکثر مبلغ ۹۰۰,۰۰۰ ریال است"),
  email: z.string().email("ایمیل نامعتبر است").optional(),
});

export type BuyChargeFormValues = z.infer<typeof buyChargeSchema>;
