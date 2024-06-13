import React from "react";

const validateLicense = async (id: string) => {
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
export default async function Page({ params }: { params: { id: string } }) {
  const res = await validateLicense(params.id);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        your key is: {params.id}
        <p className="text-center">
          {res.valid ? (
            <span className="text-green-400">valid</span>
          ) : (
            <span className="text-red-400">invalid</span>
          )}
        </p>
      </div>
      {res.error && <div>error: {res.error}</div>}
    </div>
  );
}
