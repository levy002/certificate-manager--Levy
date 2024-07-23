import { Certificate, Supplier } from '../types/types';

let db: IDBDatabase;
const version = 1;

export enum Stores {
  certificatesData = 'certificates',
  suppliersData = 'suppliers',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('certificatesDB', version);

    request.onupgradeneeded = (event): void => {
      const database = (event.target as IDBOpenDBRequest).result;

      if (!database.objectStoreNames.contains(Stores.certificatesData)) {
        database.createObjectStore(Stores.certificatesData, { keyPath: 'id' });
      }

      if (!database.objectStoreNames.contains(Stores.suppliersData)) {
        database.createObjectStore(Stores.suppliersData, { keyPath: 'index' });
      }
    };

    request.onsuccess = (): void => {
      db = request.result;
      resolve(true);
    };

    request.onerror = (): void => {
      reject(new Error(`Database error: ${request.error?.message}`));
    };
  });
};

export const addNewCertificate = (
  data: Certificate,
): Promise<Certificate | string | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    if (!data.id) {
      reject(new Error('Certificate must have an id property'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const addRequest = store.add(data);

    addRequest.onsuccess = (): void => {
      resolve(data);
    };

    addRequest.onerror = (): void => {
      reject(new Error(`Add request error: ${addRequest.error?.message}`));
    };
  });
};

export const getAllCertificates = (): Promise<Certificate[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readonly');
    const store = tx.objectStore(Stores.certificatesData);

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = (): void => {
      resolve(getAllRequest.result);
    };

    getAllRequest.onerror = (): void => {
      reject(
        new Error(`Get all request error: ${getAllRequest.error?.message}`),
      );
    };
  });
};

export const updateCertificate = (
  data: Certificate,
): Promise<Certificate | string | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const updateRequest = store.put(data);

    updateRequest.onsuccess = (): void => {
      resolve(data);
    };

    updateRequest.onerror = (): void => {
      reject(
        new Error(`Update request error: ${updateRequest.error?.message}`),
      );
    };
  });
};

export const deleteCertificate = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = (): void => {
      resolve();
    };

    deleteRequest.onerror = (): void => {
      reject(
        new Error(`Delete request error: ${deleteRequest.error?.message}`),
      );
    };
  });
};

export const addInitialSuppliers = (suppliers: Supplier[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const checkAndAddSupplier = (supplier: Supplier): Promise<void> => {
      return new Promise((res, rej) => {
        const checkTx = db.transaction(Stores.suppliersData, 'readonly');
        const checkStore = checkTx.objectStore(Stores.suppliersData);
        const getRequest = checkStore.get(supplier.index);

        getRequest.onsuccess = (): void => {
          if (getRequest.result) {
            res();
          } else {
            const addTx = db.transaction(Stores.suppliersData, 'readwrite');
            const addStore = addTx.objectStore(Stores.suppliersData);
            const addRequest = addStore.add(supplier);

            addRequest.onsuccess = (): void => res();
            addRequest.onerror = (): void =>
              rej(
                new Error(`Add request error for supplier: ${supplier.name}`),
              );

            addTx.oncomplete = (): void => res();
            addTx.onerror = (): void =>
              rej(new Error('Add transaction failed'));
          }
        };

        getRequest.onerror = (): void =>
          rej(new Error(`Error checking supplier: ${supplier.name}`));
      });
    };

    const promises = suppliers.map((supplier) => {
      if (!supplier.index) {
        return Promise.reject(
          new Error('Supplier must have an index property'),
        );
      }
      return checkAndAddSupplier(supplier);
    });

    Promise.all(promises)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const getAllSuppliers = (): Promise<Supplier[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.suppliersData, 'readonly');
    const store = tx.objectStore(Stores.suppliersData);

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = (): void => {
      resolve(getAllRequest.result);
    };

    getAllRequest.onerror = (): void => {
      reject(
        new Error(`Get all request error: ${getAllRequest.error?.message}`),
      );
    };
  });
};

export const initialSuppliers: Supplier[] = [
  { name: 'Supplier A', index: 'SUP-001', city: 'Berlin' },
  { name: 'Supplier B', index: 'SUP-002', city: 'Munich' },
  { name: 'Supplier C', index: 'SUP-003', city: 'Vienna' },
  { name: 'Supplier D', index: 'SUP-004', city: 'Graz' },
  { name: 'Supplier E', index: 'SUP-005', city: 'Sarajevo' },
  { name: 'Supplier F', index: 'SUP-006', city: 'Graz' },
  { name: 'Supplier G', index: 'SUP-007', city: 'Sarajevo' },
];

initDB().then((success) => {
  if (success) {
    return addInitialSuppliers(initialSuppliers);
  }
  return Promise.resolve();
});
