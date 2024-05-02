import {
  TWarrantyClaim,
  TWarrantyClaimedVideosAndImages,
} from "./warrantyClaim.interface";
import { getWarrantyData } from "./warrantyClaim.utils";

const checkWarrantyFromDB = async (
  phoneNumber: string,
  warrantyCode: string
) => {
  const warranty = await getWarrantyData(phoneNumber, warrantyCode);
  return warranty;
};

const createWarrantyClaimIntoDB = async (
  payload: TWarrantyClaim,
  filesInfo: TWarrantyClaimedVideosAndImages[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warranty: any
) => {
  const warrantyInfo = {
    order_id: warranty?._id,
    orderId: warranty?.orderId,
    shipping: payload?.shipping,
    problemInDetails: payload.problemInDetails,
    videosAndImages: filesInfo,
  };
  // const result = await WarrantyClaim.create(warrantyInfo);
  return warrantyInfo;
  // return result;
};

export const WarrantyClaimServices = {
  checkWarrantyFromDB,
  createWarrantyClaimIntoDB,
};
