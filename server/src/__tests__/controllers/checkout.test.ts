import * as dbMethods from "../../models/cart";
import * as orderdbMethods from "../../models/orders";
import * as cartdbMethods from "../../models/cart";
import * as discountdbMethods from "../../models/discount";

import { Item } from "../../types/items";
import request from "supertest";
import app from "../../app";
import { Discount, DiscountCodeStatus } from "../../types/discount";

jest.mock("../../database/db");
const mockItems: Item[] = [
  {
    id: "1",
    name: "Pizza",
    price: 10.0,
    category: "Food",
  },
  {
    id: "2",
    name: "Pasta",
    price: 12.0,
    category: "Food",
  },
];

describe("Checkout", () => {
  const userId = "user123";
  const cartId = `cart-${userId}`;

  it("Given invalid input for cartId, it should return an error response", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({ cartId: null, userId });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: '"cartId" must be a string',
      error: `Error occurred while checkout.`,
    });
  });

  it("Given invalid input for userId, it should return an error response", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId: null });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: '"userId" must be a string',
      error: `Error occurred while checkout.`,
    });
  });

  //TODO
  it("Given invalid input for discountCode, it should return a success response as it is an optional parameter", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId, discountCode: null });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: '"userId" must be a string',
      error: `Error occurred while checkout.`,
    });
  });

  it("Given there are no items in cart when checking out, it should return success response with specific message", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue([]);

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message:
        "No Items selected in the cart. Please select atleast one item to be able to checkout and order.",
      totalAmount: 0,
      finalAmount: 0,
      discountPercent: 0,
      discountAmount: 0,
    });
  });

  it("Given there is no cart table  when checking out, it should return error response", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error occurred while checkout.`,
      details: `Table does not exists.`,
    });
  });

  it("Given error occurrs while saving order during checkout, it should return error response", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);

    let orderSpied = jest.spyOn(orderdbMethods, "addNewOrder");
    orderSpied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error occurred while checkout.`,
      details: `Table does not exists.`,
    });
  });

  it("Given error occurrs while deleting cart during checkout, it should return error response", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);

    let orderSpied = jest.spyOn(orderdbMethods, "addNewOrder");
    orderSpied.mockResolvedValue();

    let cartSpied = jest.spyOn(cartdbMethods, "deleteCart");
    cartSpied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error occurred while checkout.`,
      details: `Table does not exists.`,
    });
  });

  it("Given valid inputs and checkout happens successfully occurrs, it should return success response", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);

    let orderSpied = jest.spyOn(orderdbMethods, "addNewOrder");
    orderSpied.mockResolvedValue();

    let cartSpied = jest.spyOn(cartdbMethods, "deleteCart");
    cartSpied.mockResolvedValue();

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Checked out successfully",
      totalAmount: 22.0,
      finalAmount: 22.0,
      discountPercent: 0,
      discountAmount: 0,
    });
  });

  it("Given valid inputs and checkout happens successfully along with valid discountCode, it should return success response with discount", async () => {
    let discount: Discount = {
      id: "1",
      code: "dummyDiscountCode",
      percent: 10,
      status: DiscountCodeStatus.AVAILABLE,
    };

    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);

    let orderSpied = jest.spyOn(orderdbMethods, "addNewOrder");
    orderSpied.mockResolvedValue();

    let cartSpied = jest.spyOn(cartdbMethods, "deleteCart");
    cartSpied.mockResolvedValue();

    let discountSpied = jest.spyOn(discountdbMethods, "getDiscountByCode");
    discountSpied.mockResolvedValue(discount);

    let discountStatusSpied = jest.spyOn(
      discountdbMethods,
      "updateDiscountStatus"
    );
    discountStatusSpied.mockResolvedValue(DiscountCodeStatus.USED);

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId, discountCode: discount.code });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Checked out successfully",
      totalAmount: 22.0,
      finalAmount: 19.8,
      discountPercent: 10,
      discountAmount: 2.2,
    });
  });

  it("Given valid inputs along with valid discountCode but updating discount code status fails, it should return error response", async () => {
    let discount: Discount = {
      id: "1",
      code: "dummyDiscountCode",
      percent: 10,
      status: DiscountCodeStatus.AVAILABLE,
    };

    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);

    let orderSpied = jest.spyOn(orderdbMethods, "addNewOrder");
    orderSpied.mockResolvedValue();

    let cartSpied = jest.spyOn(cartdbMethods, "deleteCart");
    cartSpied.mockResolvedValue();

    let discountSpied = jest.spyOn(discountdbMethods, "getDiscountByCode");
    discountSpied.mockResolvedValue(discount);

    let discountStatusSpied = jest.spyOn(
      discountdbMethods,
      "updateDiscountStatus"
    );
    discountStatusSpied.mockRejectedValue(new Error(`Updation access was not there.`));

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId, discountCode: discount.code });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: `Error occurred while checkout.`,
        details: `Updation access was not there.`,
      });
  });

  it("Given valid inputs and checkout happens successfully along with invalid discountCode, it should return success response with discount", async () => {
    let discount: Discount = {
      id: "1",
      code: "dummyDiscountCode",
      percent: 10,
      status: DiscountCodeStatus.AVAILABLE,
    };

    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);

    let orderSpied = jest.spyOn(orderdbMethods, "addNewOrder");
    orderSpied.mockResolvedValue();

    let cartSpied = jest.spyOn(cartdbMethods, "deleteCart");
    cartSpied.mockResolvedValue();

    let discountSpied = jest.spyOn(discountdbMethods, "getDiscountByCode");
    discountSpied.mockResolvedValue(null);

    const response = await request(app)
      .post("/checkout")
      .send({ cartId, userId, discountCode: discount.code });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Checked out successfully",
      totalAmount: 22.0,
      finalAmount: 22.0,
      discountPercent: 0,
      discountAmount: 0,
    });
  });
});
