const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Server error. Please try again.");
  }

  return data;
}

export async function initiatePayment(paymentData) {
  const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentData)
  });

  return handleResponse(response);
}

export async function getPaymentStatus(transactionId) {
  const response = await fetch(`${API_BASE_URL}/payments/status/${transactionId}`);
  return handleResponse(response);
}

export async function getTransactionHistory(userId) {
  const response = await fetch(`${API_BASE_URL}/payments/history/${userId}`);
  return handleResponse(response);
}