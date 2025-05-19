import { BankResponse, BankValidation } from "@/types/bankValidation";

export function isBankValidation(data: BankResponse): data is BankValidation {
  return "banks" in data;
}
