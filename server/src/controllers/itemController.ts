import { v4 as uuidv4 } from "uuid";
import { addNewItem, getAllItems, getItemById } from "../models/items";
import { Category, Item } from "../types/items";

export const initialize = async () => {
  try {
    const items: Item[] = [
      { id: uuidv4(), name: "Shirt", price: 300, category: Category.FASHION },
      { id: uuidv4(), name: "Jeans", price: 400, category: Category.FASHION },
      { id: uuidv4(), name: "Lipstick", price: 50, category: Category.BEAUTY },
      {
        id: uuidv4(),
        name: "Foundation",
        price: 100,
        category: Category.BEAUTY,
      },
    ];

    for (const item of items) {
      await addNewItem(item);
    }
    console.log("Initial items added to the store.");
  } catch (error) {
    console.error(`Error occurred while initializing items table.`, error);
    throw new Error(error);
  }
};

export const getAll = async () => {
  try {
    return await getAllItems();
  } catch (error) {
    console.error(`Error occurred while getting items from table.`, error);
    throw new Error(error);
  }
};

export const getById = async (id: string) => {
  try {
    let items = await getItemById(id);
    if (items.length == 0) {
      throw new Error(`There is no item present with the given id ${id}`);
    } else {
      return items[0];
    }
  } catch (error) {
    console.error(
      `Error occurred while getting item with id ${id} from table.`,
      error
    );
    throw new Error(error);
  }
};
