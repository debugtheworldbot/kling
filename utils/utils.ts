export const validateLicense = async (id: string) => {
  const res: {
    valid: boolean;
    error: string | null;
  } = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `license_key=${id}`,
  }).then((r) => r.json());
  return res;
};
