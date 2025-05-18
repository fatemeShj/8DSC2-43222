export async function submitBuyCharge(payload: {
  channel: string;
  sim_type: "postpaid" | "prepaid";
  amount: number;
  msisdn: string;
  is_wow: boolean;
}) {
  try {
    const response = await fetch(
      "https://apishop.irancell.ir/charge/api/v2/validate_and_get_banks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching validate and get banks:", error);
    throw error;
  }
}
