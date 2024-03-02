"use client";
import { ReviewModelCard } from "@/components";
import { StarFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Rate } from "antd";
import { useState } from "react";

interface ReviewModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const ReviewModal = (props: ReviewModalProps) => {
  const { isModalOpen = false, onCancel } = props;
  const [rating, setRating] = useState<number>(5);

  return (
    <Modal
      className="rounded-lg"
      width={700}
      title={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={(e) => {
        onCancel?.(e);
      }}
      footer={null}
    >
      <div className="flex w-full flex-col gap-10 ">
        <span className="text-2xl lg:text-[32px] font-medium ">
          All Reviews
        </span>
        <div className="flex gap-3">
          {Array(5)
            .fill(0)
            .map((_, i) => {
              const val = 5 - i;
              return (
                <Button
                  key={i}
                  onClick={() => {
                    setRating(val);
                  }}
                  ghost
                  className={
                    "!flex items-center !rounded-lg !border-gray-700" +
                    (rating == val ? " !bg-[#424242]" : "")
                  }
                >
                  <StarFilled style={{ color: "orange" }} />
                  <span className="text-white text-lg font-medium">{val}</span>
                </Button>
              );
            })}
        </div>
        <div className="flex flex-col h-[546px] styled-scrollbar overflow-y-auto">
          {[...Array(10).fill(0)].map((e, i) => (
            <ReviewModelCard key={i} />
          ))}
        </div>
        <Form>
          <Form.Item
            name="TextArea"
            rules={[{ required: true, message: "Please input a review" }]}
          >
            <Input.TextArea
              placeholder="Enter Review"
              className="!h-[96px]"
              showCount
              maxLength={60}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

interface AddReviewModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AddReviewModal = (props: AddReviewModalProps) => {
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
        <span className="text-2xl lg:text-[32px] font-medium mb-2">
          Add a Review
        </span>
        <span className="text-gray-500 mb-10">
          Share your thoughts about this comic
        </span>

        <Form>
          <Form.Item
            name="TextArea"
            rules={[{ required: true, message: "Please input a review" }]}
          >
            <Input.TextArea
              placeholder="Enter Review"
              className="!h-[128px]"
              showCount
              maxLength={60}
            />
          </Form.Item>

          <div className="flex justify-between my-10">
            <span className="">Rate this Comic</span>
            <Rate
              value={rating}
              onChange={(v) => {
                setRating(v);
              }}
            />
          </div>
          <>
            <Button
              type="primary"
              shape="round"
              className="!flex items-center gap-1 w-full justify-center mb-2 mt-10"
            >
              <span className="font-medium text-sm text-black ">
                Add Review
              </span>
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
              <span className="font-medium text-sm ">Maybe Later</span>
            </Button>
          </>
        </Form>
      </div>
    </Modal>
  );
};
