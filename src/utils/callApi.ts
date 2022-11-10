const updateCalculation = async (equation: string): Promise<{
  success: boolean;
  result: string;
}> => {
  const response = await fetch('/api/calculate', {
    body: JSON.stringify({ equation }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });

  return response.json();
};

export {
  updateCalculation,
};
