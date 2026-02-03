const API_URL = "http://localhost:3001";

export const fetchRecords = async () => {
  const res = await fetch(`${API_URL}/records`);
  if (!res.ok) {
    throw new Error("Failed to fetch records");
  }
  return res.json();
};

export const addRecordApi = async (newRecord) => {
  const res = await fetch(`${API_URL}/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecord),
  });

  return res.json();
};

export const deleteRecordApi = async (id) => {
  await fetch(`${API_URL}/records/${id}`, {
    method: "DELETE",
  });
};

export const updateRecordApi = async (id, updatedRecord) => {
  const res = await fetch(`${API_URL}/records/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRecord),
  });

  return res.json();
};
