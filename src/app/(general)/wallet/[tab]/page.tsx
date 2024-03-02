import React from "react";

import { WalletMainLayout } from "@/components";

const WalletPage = () => {
  return (
    <div className="flex flex-col border-gray-200 border p-4">
      <div className="flex justify-center mb-4">
        <span>Connected Account: ml:a82j9d02isi92e89sdd</span>
      </div>
      <WalletMainLayout />
    </div>
  );
};

export default WalletPage;
