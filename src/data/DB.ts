import { Certificate, Supplier, User } from '../types/Types';

let db: IDBDatabase;
const version = 1;

export enum Stores {
  certificatesData = 'certificates',
  suppliersData = 'suppliers',
  usersData = 'users',
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

      if (!database.objectStoreNames.contains(Stores.usersData)) {
        database.createObjectStore(Stores.usersData, { keyPath: 'userId' });
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

export const getCertificateById = (id: number): Promise<Certificate | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readonly');
    const store = tx.objectStore(Stores.certificatesData);
    const getRequest = store.get(id);

    getRequest.onsuccess = (): void => {
      resolve(getRequest.result || null);
    };

    getRequest.onerror = (): void => {
      reject(new Error(`Get request error: ${getRequest.error?.message}`));
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

export const getSupplierByIndex = (index: string): Promise<Supplier | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.suppliersData, 'readonly');
    const store = tx.objectStore(Stores.suppliersData);
    const getRequest = store.get(index);

    getRequest.onsuccess = (): void => {
      resolve(getRequest.result || null);
    };

    getRequest.onerror = (): void => {
      reject(new Error(`Get request error: ${getRequest.error?.message}`));
    };
  });
};

export const addInitialUsers = (allUsers: User[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const checkAndAddUser = (user: User): Promise<void> => {
      return new Promise((res, rej) => {
        const checkTx = db.transaction(Stores.usersData, 'readonly');
        const checkStore = checkTx.objectStore(Stores.usersData);
        const getRequest = checkStore.get(user.userId);

        getRequest.onsuccess = (): void => {
          if (getRequest.result) {
            res();
          } else {
            const addTx = db.transaction(Stores.usersData, 'readwrite');
            const addStore = addTx.objectStore(Stores.usersData);
            const addRequest = addStore.add(user);

            addRequest.onsuccess = (): void => res();
            addRequest.onerror = (): void =>
              rej(new Error(`Add request error for user: ${user.name}`));

            addTx.oncomplete = (): void => res();
            addTx.onerror = (): void =>
              rej(new Error('Add transaction failed'));
          }
        };

        getRequest.onerror = (): void =>
          rej(new Error(`Error checking user: ${user.name}`));
      });
    };

    const promises = allUsers.map((user) => {
      if (!user.userId) {
        return Promise.reject(new Error('User must have a userId property'));
      }
      return checkAndAddUser(user);
    });

    Promise.all(promises)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.usersData, 'readonly');
    const store = tx.objectStore(Stores.usersData);

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

export const searchUser = (
  name?: string,
  firstName?: string,
  userId?: string,
  department?: string,
  plant?: string,
  email?: string,
): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.usersData, 'readonly');
    const store = tx.objectStore(Stores.usersData);

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = (): void => {
      const users = getAllRequest.result as User[];

      const filteredUsers = users.filter((user) => {
        return (
          (name
            ? user.name?.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (firstName
            ? user.firstName?.toLowerCase().includes(firstName.toLowerCase())
            : true) &&
          (userId ? user.userId === userId : true) &&
          (department
            ? user.department?.toLowerCase().includes(department.toLowerCase())
            : true) &&
          (plant
            ? user.plant?.toLowerCase().includes(plant.toLowerCase())
            : true) &&
          (email
            ? user.email?.toLowerCase().includes(email.toLowerCase())
            : true)
        );
      });

      resolve(filteredUsers);
    };

    getAllRequest.onerror = (): void => {
      reject(
        new Error(`Get all request error: ${getAllRequest.error?.message}`),
      );
    };
  });
};
