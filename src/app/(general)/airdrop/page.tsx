import { AirDrop } from "@/components/layouts/wallet/airdrop";
import React, { Suspense } from "react";

const AirdropPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <AirDrop />
      </Suspense>
    </div>
  );
};

export default AirdropPage;
