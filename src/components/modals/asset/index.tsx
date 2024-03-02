"use client";
import { ReviewModelCard } from "@/components";
import { StarFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Rate } from "antd";
import { useState } from "react";

interface DeleteAssetModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const DeleteAssetModal = (props: DeleteAssetModalProps) => {
  const { isModalOpen = false, onCancel } = props;
  const [rating, setRating] = useState<number>(5);

  return (
    <Modal
      className="rounded-lg"
      title={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={(e) => {
        onCancel?.(e);
      }}
      footer={null}
    >
      <div className="flex w-full flex-col ">
        <span className="text-2xl lg:text-[32px] font-medium mb-6">
          Delete Comic?
        </span>
        <span className="text-sm text-white mb-6">
          Remember, deleting a comic will remove it from your library and for
          all readers. This action cannot be undone!
        </span>

        <Button
          type="primary"
          shape="round"
          className="!flex items-center gap-1 w-full justify-center mb-2"
        >
          <span className="font-medium text-sm text-black ">Delete Now</span>
        </Button>
        <Button
          onClick={(e: any) => {
            setRating(0);
            onCancel?.(e);
          }}
          type="text"
          shape="round"
          className="!flex items-center gap-1 w-full justify-center"
        >
          <span className="font-medium text-sm ">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};
