import { AirDropv2 } from "@/components/layouts/wallet/airdropv2";
import React, { Suspense } from "react";

const AirdropPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <AirDropv2 />
      </Suspense>
    </div>
  );
};

export default AirdropPage;
