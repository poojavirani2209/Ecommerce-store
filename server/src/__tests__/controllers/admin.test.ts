import * as orderdbMethods from "../../models/orders";
import * as discountdbMethods from "../../models/discount";

import { Item } from "../../types/items";
import request from "supertest";
import app from "../../app";
import { Order } from "../../types/order";
import * as uuid from "uuid";

jest.mock("uuid");
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

let mockOrders: Order[] = [
  { id: "1", items: JSON.stringify(mockItems), discountAmount: 2.2 },
  { id: "2", items: JSON.stringify(mockItems), discountAmount: 0 },
];

let mockDiscountCodes = ["dummy1", "dummy2"];

describe("Get Order Summaries", () => {
  it("Given orders and discountcodes have been acheived from database successfully, it should return order summary with success response.", async () => {
    let spied = jest.spyOn(orderdbMethods, "getAllOrders");
    spied.mockResolvedValue(mockOrders);

    let discountSpied = jest.spyOn(discountdbMethods, "getAllDiscountsCodes");
    discountSpied.mockResolvedValue(mockDiscountCodes);

    const response = await request(app).get("/admin/summary");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      itemsPurchased: 4,
      totalItemsPurchasedAmount: 44.0,
      discountCodes: mockDiscountCodes,
      totalDiscountAmount: 2.2,
    });
  });

  it("Given orders have been acheived from database successfully with no discount codes created yet, it should return order summary with success response.", async () => {
    let spied = jest.spyOn(orderdbMethods, "getAllOrders");
    mockOrders[0].discountAmount = 0;

    spied.mockResolvedValue(mockOrders);

    let discountSpied = jest.spyOn(discountdbMethods, "getAllDiscountsCodes");
    discountSpied.mockResolvedValue([]);

    const response = await request(app).get("/admin/summary");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      itemsPurchased: 4,
      totalItemsPurchasedAmount: 44.0,
      discountCodes: [],
      totalDiscountAmount: 0,
    });
  });

  it("Given error while achieving orders and discountcodes, it should return failure response.", async () => {
    let spied = jest.spyOn(orderdbMethods, "getAllOrders");
    spied.mockRejectedValue("Table does not exists.");

    let discountSpied = jest.spyOn(discountdbMethods, "getAllDiscountsCodes");
    discountSpied.mockResolvedValue(mockDiscountCodes);

    const response = await request(app).get("/admin/summary");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error occurred while getting order summary.`,
      details: `Table does not exists.`,
    });
  });
});

describe("Generate discount", () => {
  it("Given it is nth order,it should return success response with generated discount code.", async () => {
    let spied = jest.spyOn(orderdbMethods, "getOrderNumber");
    spied.mockResolvedValue(2);

    let discountSpied = jest.spyOn(discountdbMethods, "addNewDiscountCode");
    discountSpied.mockResolvedValue("123456789");

    jest.spyOn(uuid, "v4").mockReturnValue("123456789");

    const response = await request(app)
      .post("/admin/generate-discount")
      .send({ nthOrder: 3 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      discountCode: "123456789",
    });
  });

  it("Given it is not nth order,it should return success response with no generated discount code.", async () => {
    let spied = jest.spyOn(orderdbMethods, "getOrderNumber");
    spied.mockResolvedValue(3);

    let discountSpied = jest.spyOn(discountdbMethods, "addNewDiscountCode");
    discountSpied.mockResolvedValue("123456789");

    jest.spyOn(uuid, "v4").mockReturnValue("123456789");

    const response = await request(app)
      .post("/admin/generate-discount")
      .send({ nthOrder: 3 });

    expect(response.status).toBe(204);
  });

  it("Given invalid inputs,it should return failure response.", async () => {
    let spied = jest.spyOn(orderdbMethods, "getOrderNumber");
    spied.mockResolvedValue(3);

    let discountSpied = jest.spyOn(discountdbMethods, "addNewDiscountCode");
    discountSpied.mockResolvedValue("123456789");

    jest.spyOn(uuid, "v4").mockReturnValue("123456789");

    const response = await request(app)
      .post("/admin/generate-discount")
      .send({ nthOrder: "abcd" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: '"nthOrder" must be a number',
      error: `Error occurred while generating discount code.`,
    });
  });
});
