const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Server error. Please try again.");
  }

  return data;
}

export async function createOrder(paymentData) {
  const response = await fetch(`${API_BASE_URL}/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentData)
  });

  return handleResponse(response);
}

export async function verifyPayment(paymentData) {
  const response = await fetch(`${API_BASE_URL}/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentData)
  });

  return handleResponse(response);
}

export async function getPaymentStatus(transactionId) {
  return {
    transactionId,
    amount: "-",
    status: "pending",
    message: "Payment status API is not available in backend yet."
  };
}

export async function getTransactionHistory() {
  return {
    transactions: []
  };
}