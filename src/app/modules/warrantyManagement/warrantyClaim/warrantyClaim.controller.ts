import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utilities/catchAsync";
import successResponse from "../../../utilities/successResponse";
import { WarrantyClaimServices } from "./warrantyClaim.service";

const checkWarranty = catchAsync(async (req: Request, res: Response) => {
  const { phoneNumber, warrantyCode } = req.body;
  const warranty = await WarrantyClaimServices.checkWarrantyFromDB(
    phoneNumber,
    warrantyCode
  );
  successResponse(res, {
    statusCode: httpStatus.OK,
    message: "Warranty details retrieved successfully",
    data: warranty,
  });
});

const createWarrantyClaimReq = catchAsync(
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filesInfo = (req?.files as any[])?.map((file) => ({
      path: file.path,
      type: file.mimetype,
    }));
    console.log(req.body);
    // const warranty = await WarrantyClaimServices.createWarrantyClaimIntoDB(
    //   req.body,
    //   filesInfo,
    //   req.anyData
    // );
    successResponse(res, {
      statusCode: httpStatus.OK,
      message: "Warranty claim request created successfully",
      // data: warranty,
    });
  }
);

export const WarrantyClaimController = {
  checkWarranty,
  createWarrantyClaimReq,
};
