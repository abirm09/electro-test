import { z } from "zod";
import { shippingValidationZodSchema } from "../../orderManagement/shipping/shipping.validation";
import { genericPhoneNumberZodSchema } from "../../userManagement/user/user.validation";

const checkWarranty = z.object({
  body: z.object({
    phoneNumber: genericPhoneNumberZodSchema(),
    warrantyCode: z.string({ required_error: "Warranty code is required." }),
  }),
});

const createWarrantyClaimReq = z.object({
  body: z.object({
    phoneNumber: genericPhoneNumberZodSchema(),
    warrantyCode: z.string({ required_error: "Warranty code is required." }),
    shipping: shippingValidationZodSchema(true),
    problemInDetails: z.string({
      required_error: "Problem details is required",
    }),
  }),
});

export const ClaimWarrantyValidation = {
  checkWarranty,
  createWarrantyClaimReq,
};
