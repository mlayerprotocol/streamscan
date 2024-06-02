import { AirDrop } from "@/components/layouts/wallet/airdrop";
import { PendingTopics } from "@/components/layouts/wallet/topics/pending";
import React from "react";

const PendingTopicPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PendingTopics />
    </div>
  );
};

export default PendingTopicPage;
