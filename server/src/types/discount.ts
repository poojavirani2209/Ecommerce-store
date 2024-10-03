import Joi from "joi";

export interface Discount {
  id: string;
  code: string;
  percent: number;
  status: DiscountCodeStatus;
}

export enum DiscountCodeStatus {
  AVAILABLE = "AVAILABLE",
  USED = "USED",
  EXPIRED = "EXPIRED",
}

interface GenerateDiscountRequestBody {
  nthOrder: number;
}

// Validation schemas
export const GenerateDiscountSchema = Joi.object<GenerateDiscountRequestBody>({
  nthOrder: Joi.number().required(),
});
