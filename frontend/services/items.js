
import { Item } from '../models/item';

// Mock implementation for item management functions
export const firestore = {
  // Simulate creating an item
  createItem: (itemData) => {
    console.log('Creating item:', itemData);
    return Promise.resolve({ ...Item, ...itemData, id: 'mock-item-id', createdAt: new Date() });
  },

  // Simulate fetching a list of items
  getItems: () => {
    return Promise.resolve([
      { ...Item, id: '1', title: 'Lost Keys', description: 'A set of keys on a red keychain.', category: 'personal', location: 'library' },
      { ...Item, id: '2', title: 'Found Wallet', description: 'A brown leather wallet.', category: 'personal', location: 'student center' },
    ]);
  },

  // Simulate real-time updates
  onSnapshot: (callback) => {
    const mockItems = [
      { ...Item, id: '1', title: 'Lost Keys', description: 'A set of keys on a red keychain.', category: 'personal', location: 'library' },
      { ...Item, id: '2', title: 'Found Wallet', description: 'A brown leather wallet.', category: 'personal', location: 'student center' },
    ];

    // Immediately invoke the callback with the initial data
    callback(mockItems);

    // Simulate a new item being added after a delay
    setTimeout(() => {
      const newItem = { ...Item, id: '3', title: 'New Item', description: 'A newly added item.', category: 'other', location: 'somewhere' };
      callback([ ...mockItems, newItem ]);
    }, 5000);

    // Return a mock unsubscribe function
    return () => console.log('Unsubscribed from real-time updates');
  },
};
