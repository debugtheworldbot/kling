import Generate from "@/components/Generate";
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
export default async function Page({
  searchParams,
}: {
  searchParams: { license_key: string };
}) {
  const res = await validateLicense(searchParams.license_key);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-12">
      <div>
        your key is: {searchParams.license_key}
        <p className="text-center">
          {res.valid ? (
            <span className="text-green-400">valid</span>
          ) : (
            <span className="text-red-400">invalid</span>
          )}
        </p>
      </div>
      {res.error && <div>error: {res.error}</div>}
      <Generate license_key={searchParams.license_key} />
    </div>
  );
}
