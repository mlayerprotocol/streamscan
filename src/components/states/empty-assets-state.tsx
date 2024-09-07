import { AuthModelData } from "@/model";
import { Button, Skeleton } from "antd";

interface EmptyAssetStateProps {
  userData?: AuthModelData;
}
export const EmptyAssetState = (props: EmptyAssetStateProps) => {
  return (
    <div className="flex flex-col items-center my-10 lg:my-20 gap-6">
      <div className="flex w-full lg:w-1/2 gap-6">
        <div className="flex flex-col w-full gap-2">
          <Skeleton.Button
            className="!rounded !h-[192px]"
            shape={"square"}
            block={true}
          />
          <Skeleton.Button className="!h-2" shape={"square"} block={true} />
          <Skeleton.Button className="!h-2" shape={"square"} block={true} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Skeleton.Button
            className="!rounded !h-[192px]"
            shape={"square"}
            block={true}
          />
          <Skeleton.Button className="!h-2" shape={"square"} block={true} />
          <Skeleton.Button className="!h-2" shape={"square"} block={true} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Skeleton.Button
            className="!rounded !h-[192px]"
            shape={"square"}
            block={true}
          />
          <Skeleton.Button className="!h-2" shape={"square"} block={true} />
          <Skeleton.Button className="!h-2" shape={"square"} block={true} />
        </div>
      </div>
      <span className="text-base font-medium">
        You don’t have any comic published
      </span>
      <Button type="primary" shape="round">
        <span className="">Publish Comic</span>
      </Button>
    </div>
  );
};
