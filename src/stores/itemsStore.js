import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialItems } from "../lib/constants";

//the new returned store object in zustand that set will return is merged with existing store
//state in zustand is like prev state in setItems in useState hook
export const useItemsStore = create(
  persist(
    set => ({
      items: initialItems,
      addItem: newItemText => {
        const newItem = {
          id: new Date().getTime(),
          name: newItemText,
          packed: false
        };

        set(state => ({ items: [...state.items, newItem] }));
      },
      deleteItem: id => {
        set(state => {
          const newItems = state.items.filter(item => item.id !== id);
          return { items: newItems };
        });
      },
      toggleItem: id => {
        set(state => {
          const newItems = state.items.map(item => {
            if (item.id === id) {
              return { ...item, packed: !item.packed };
            }

            return item;
          });
          //return the new object for the store to merge with the existing store object
          return { items: newItems };
        });
      },
      removeAllItems: () => set({ items: [] }),
      resetToInitial: () => set({ items: initialItems }),
      markAllAsComplete: () =>
        set(state => {
          const newItems = state.items.map(item => ({ ...item, packed: true }));
          return { items: newItems };
        }),
      markAllAsIncomplete: () =>
        set(state => {
          const newItems = state.items.map(item => ({
            ...item,
            packed: false
          }));
          //return the new object store to merge with the existing store object
          return { items: newItems };
        })
    }),
    {
      name: "items"
    }
  )
);
