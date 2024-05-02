import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errorHandlers/ApiError";
import catchAsync from "../../../utilities/catchAsync";
import { getWarrantyData } from "./warrantyClaim.utils";

const validateWarranty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, warrantyCode } = req.body;
    const warranty = await getWarrantyData(phoneNumber, warrantyCode);
    const endsDate = new Date(warranty?.products?.warranty.endsDate);
    // const endsDate = new Date("April 24, 2024");
    const today = new Date();
    if (today > endsDate) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The warranty expired on '${warranty?.products?.warranty.endsDate}'`
      );
    }
    req.anyData = warranty;
    next();
  }
);

const parseFormData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, shipping, warrantyCode } = req.body;
    const { fullName, address, phoneNumber2 } = shipping;
    const data = {
      phoneNumber,
      warrantyCode,
      shipping: { fullName, address, phoneNumber: phoneNumber2 },
    };
    req.body = data;
    next();
  }
);

export const WarrantyClaimMiddlewares = { validateWarranty, parseFormData };
