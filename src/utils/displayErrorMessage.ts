import { message } from "antd";

export const displayErrorMessage = (error: any) => {
  console.log({ error });
  try {
    if (
      error?.data.meta.message &&
      typeof error?.data.meta.message === "object"
    ) {
      Object.values(error?.data.meta.message).map((error: any) => {
        Object.values(error).map((_error: any) => {
          console.log({ _error });
          message.error(_error ?? "Unknown Error", 2, () => message.destroy());
        });
      });
    } else {
      return message.error(error?.data.meta.message ?? "Unknown Error", 3);
    }
  } catch (error) {
    console.log(error);
  }
  return error;
};
