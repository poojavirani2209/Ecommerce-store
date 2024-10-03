import * as dbMethods from "../../models/cart";
import { Item } from "../../types/items";
import request from "supertest";
import app from "../../app";

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

describe("Add items to cart", () => {
  const userId = "user123";
  const cartId = `cart-${userId}`;

  it("Given existing userId and items, it should add items to the cart and return the cartId", async () => {
    let spied = jest.spyOn(dbMethods, "addItemToCart");
    spied.mockResolvedValue();

    const response = await request(app)
      .post("/cart/add")
      .send({ items: mockItems, userId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ cartId });
    expect(spied).toHaveBeenCalledWith(cartId, mockItems);
  });

  it("Given invalid input for items, it should return an error response", async () => {
    const response = await request(app)
      .post("/cart/add")
      .send({ items: [], userId });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: '"items" must contain at least 1 items',
      error: "Error occurred while adding item to cart.",
    });
  });

  it("Given invalid input for userId, it should return an error response", async () => {
    const response = await request(app)
      .post("/cart/add")
      .send({ items: mockItems, userId: null });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: '"userId" must be a string',
      error: "Error occurred while adding item to cart.",
    });
  });

  it("Given cart table does not exist in database, then a failure response specifying internal server error should be sent.", async () => {
    let spied = jest.spyOn(dbMethods, "addItemToCart");
    spied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app)
      .get("/cart/add")
      .send({ items: mockItems, userId });

    expect(response.status).toBe(500);
  });
});

describe("Get items from cart", () => {
  const cartId = "cart-user-123";

  it("Given existing cart Id, it should return items from the cart", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockResolvedValue(mockItems);
    const response = await request(app).get(`/cart/${cartId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ items: mockItems });
    expect(spied).toHaveBeenCalledWith(cartId);
  });

//TODO
//   it("Given invalid input for cartId, it should return a error response", async () => {
//     const response = await request(app).get("/cart/"); 

//     expect(response.status).toBe(500);
//     expect(response.body).toEqual({
//       details: '"cartId" must be a string',
//       error: "Error occurred while adding item to cart.",
//     });
//   });

  it("Given cart table does not exist in database, then a failure response specifying internal server error should be sent.", async () => {
    let spied = jest.spyOn(dbMethods, "getItemsByCartId");
    spied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app).get(`/cart/${cartId}`);

    expect(response.status).toBe(500);
  });
});
