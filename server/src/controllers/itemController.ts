import { v4 as uuidv4 } from 'uuid';
import { addNewItem, getAllItems, getItemById } from '../models/items';
import { Category,Item } from '../types/items';

export const initialize = async () => {
    const items: Item[] = [
      { id: uuidv4(), name: 'Shirt', price: 300, category:Category.FASHION },
      { id: uuidv4(), name: 'Jeans', price: 400, category: Category.FASHION },
      { id: uuidv4(), name: 'Lipstick', price: 50, category: Category.BEAUTY },
      { id: uuidv4(), name: 'Foundation', price: 100, category: Category.BEAUTY }
    ];
  
    for (const item of items) {
      await addNewItem(item);
    }
    console.log('Initial items added to the store.');
};

export const getAll = async()=>{
   return await getAllItems();
}

export const getById = async(id:string)=>{
  return await getItemById(id);
}