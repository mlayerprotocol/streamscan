import {
  Button,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import NextImage from "next/image";
import { EpisodeCard } from "@/components";
import Image from "next/image";

const items: MenuProps["items"] = [
  {
    label: <span className="text-lg font-medium">Newest First</span>,
    key: "1",
  },
  {
    label: <span className="text-lg font-medium">Oldest First</span>,
    key: "2",
  },
];

const menuProps = {
  items,
  //   onClick: handleMenuClick,
};

interface EpisodeModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const EpisodeModal = (props: EpisodeModalProps) => {
  const { isModalOpen = false, onCancel } = props;

  return (
    <Modal
      className="rounded-lg"
      width={1008}
      title={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={(e) => {
        onCancel?.(e);
      }}
      footer={null}
    >
      <div className="flex w-full flex-col">
        <div className="flex justify-between flex-wrap w-full mb-10">
          <span className="text-2xl lg:text-[32px] font-medium">
            All Episodes
          </span>
          <Space className="!gap-4 flex-wrap">
            <Input
              className="!w-[342px] ml-auto"
              prefix={
                <Image
                  src="/icons/search.svg"
                  alt="Vercel Logo"
                  width={20}
                  height={20}
                  priority
                />
              }
              placeholder="Search Episode"
            />
            <Dropdown menu={menuProps}>
              <Button className="!rounded-lg !bg-[#292929]">
                <Space className="text-lg font-medium">
                  <NextImage
                    src="/icons/tune.svg"
                    alt="Vercel Logo"
                    width={20}
                    height={20}
                    priority
                  />
                  Newest First
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </div>
        <div className="flex flex-col">
          {[...Array(10).fill(0)].map((e, i) => (
            <EpisodeCard key={i} locked={i == 0} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

interface AccessModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AccessModal = (props: AccessModalProps) => {
  const { isModalOpen = false, onCancel } = props;

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
          Gain Special Access?
        </span>
        <span className="text-gray-500 mb-10">
          Gain access to unreleased episode of this comic
        </span>

        <div className="flex justify-between py-3">
          <span className="text-gray-500 ">Comic Name</span>
          <span className=" ">Constantine: The HellBlazer</span>
        </div>
        <Divider className="!my-4" />
        <div className="flex justify-between py-3">
          <span className="text-gray-500 ">Episode Unreleased</span>
          <span className=" ">Episode 24: Beyond the Universe</span>
        </div>
        <Divider className="!my-4 mb-10" />
        <div className="flex justify-between py-3">
          <span className="text-gray-500 ">Amount</span>
          <span className="text-green-500 font-bold ">5 TOON</span>
        </div>

        <>
          <Button
            type="primary"
            shape="round"
            className="!flex items-center gap-1 w-full justify-center mb-2 mt-10"
          >
            <span className="font-medium text-sm text-black ">Pay Now</span>
          </Button>
          <Button
            onClick={(e: any) => {
              onCancel?.(e);
            }}
            type="text"
            shape="round"
            className="!flex items-center gap-1 w-full justify-center"
          >
            <span className="font-medium text-sm ">Cancel</span>
          </Button>
        </>
      </div>
    </Modal>
  );
};
