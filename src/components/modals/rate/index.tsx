"use client";
import { Button, Modal, Rate } from "antd";
import { useState } from "react";

interface RateModalProps {
  isModalOpen?: boolean;

  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const RateModal = (props: RateModalProps) => {
  const { isModalOpen = false, onCancel } = props;
  const [rating, setRating] = useState<number>(0);

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
      <div className="flex w-full items-center flex-col ">
        <span className="text-2xl lg:text-[32px] font-medium mb-10">
          Rate this Comic
        </span>

        <Rate
          value={rating}
          onChange={(v) => {
            setRating(v);
          }}
          style={{ fontSize: "64px" }}
        />
        {rating > 0 && (
          <>
            <Button
              type="primary"
              shape="round"
              className="!flex items-center gap-1 w-full justify-center mb-2 mt-10"
            >
              <span className="font-medium text-sm text-black ">Done</span>
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
              <span className="font-medium text-sm ">Clear</span>
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
