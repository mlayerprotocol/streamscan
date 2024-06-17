"use client";
import { PendingTopics } from "@/components/layouts/wallet/topics/pending";
import React, { Suspense } from "react";

const PendingTopicPage = () => {
  return (
    <Suspense>
      <div className="flex flex-col gap-4">
        <PendingTopics />
      </div>
    </Suspense>
  );
};

export default PendingTopicPage;
