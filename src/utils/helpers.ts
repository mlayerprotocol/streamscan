import { RcFile } from "antd/es/upload";

export function randomImageUrl(): string {
  return `https://source.unsplash.com/random?${
    Math.floor(Math.random() * 3) + 1
  }`;
}
export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
