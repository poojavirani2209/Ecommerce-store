import Joi from "joi";

interface CheckoutRequestBody {
  userId: string;
  cartId: string;
  discountCode?: string;
}

// Validation schemas
export const CheckoutSchema = Joi.object<CheckoutRequestBody>({
  userId: Joi.string().required(),
  cartId: Joi.string().required(),
  discountCode:Joi.string().optional(),
});
