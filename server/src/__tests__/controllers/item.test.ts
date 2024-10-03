import request from "supertest";
import app from "../../app";
import * as dbMethods from "../../models/items";
import { initialize } from "../../controllers/itemController";

jest.mock("../../database/db");

describe("Get all items", () => {
  const mockItem = {
    id: "123",
    name: "Waffle",
    price: 5.0,
    category: "Food",
  };

  it("Given database has 2 elements in the table items, then it should get all items with length equal to 2", async () => {
    let spied = jest.spyOn(dbMethods, "getAllItems");
    spied.mockResolvedValue([mockItem]);

    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.items)).toBeTruthy();
    expect(response.body.items.length).toEqual(1);
  });

  it("Given database has more than 0 elememts in the table items, then it should get all items with length equal to 0.", async () => {
    let spied = jest.spyOn(dbMethods, "getAllItems");
    spied.mockResolvedValue([]);

    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.items)).toBeTruthy();
    expect(response.body.items.length).toEqual(0);
  });

  it("Given items table does not exist in database, then a failure response specifying internal server error should be sent.", async () => {
    let spied = jest.spyOn(dbMethods, "getAllItems");
    spied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app).get("/items");
    expect(response.status).toBe(500);
    expect(Array.isArray(response.body.items)).toBeFalsy();
    expect(response.body).toEqual({
      error: `Error occurred while fetching items.`,
      details: `Error: Table does not exists.`,
    });
  });
});

describe("Get item by id", () => {
  const mockItem = {
    id: "123",
    name: "Waffle",
    price: 5.0,
    category: "Food",
  };

  it("Given items table has the item with given id, then it should return success response with the item details.", async () => {
    let spied = jest.spyOn(dbMethods, "getItemById");
    spied.mockResolvedValue([mockItem]);

    const response = await request(app).get(`/items/${mockItem.id}`);
    expect(response.status).toBe(200);
    expect(response.body.item).toEqual(mockItem);
  });

  it("Given items table does not have the item with given id, then it should failure response.", async () => {
    let spied = jest.spyOn(dbMethods, "getItemById");
    spied.mockResolvedValue([]);

    const response = await request(app).get(`/items/${mockItem.id}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      details: `Error: There is no item present with the given id ${mockItem.id}`,
      error: `Error occurred while fetching item by id ${mockItem.id}.`,
    });
  });

  it("Given items table does not exist in database, then a failure response specifying internal server error should be sent.", async () => {
    let spied = jest.spyOn(dbMethods, "getItemById");
    spied.mockRejectedValue(new Error(`Table does not exists.`));

    const response = await request(app).get(`/items/${mockItem.id}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error occurred while fetching item by id ${mockItem.id}.`,
      details: `Error: Table does not exists.`,
    });
  });
});

describe("Initialize items table", () => {
  it("Given items table has the item with given id, then it should return success response with the item details.", async () => {
    let spied = jest.spyOn(dbMethods, "addNewItem");
    spied.mockResolvedValue();

    await initialize();
    expect(dbMethods.addNewItem).toHaveBeenCalledTimes(4);
  });

  it("Given items table does not exist in database, then a failure response specifying internal server error should be sent.", async () => {
    let spied = jest.spyOn(dbMethods, "addNewItem");
    spied.mockRejectedValue(new Error(`Table does not exists.`));

    try {
      await initialize();
    } catch (error) {
      expect(error.message).toBe(`Error: Table does not exists.`);
    }
    expect(dbMethods.addNewItem).toHaveBeenCalledTimes(1);
  });
});
