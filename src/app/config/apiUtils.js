export async function handleResponse(response) {
  //Below code need to be enable when we have real API// Reminder to Sharief
  //if (response.ok) return response.json();

  if (response.ok) return response.json();

  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// reminder for sharief to create logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
