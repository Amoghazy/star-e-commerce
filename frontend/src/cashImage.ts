/* eslint-disable @typescript-eslint/no-explicit-any */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve: any, reject: any) => {
    const request = indexedDB.open("imagesCache", 1);
    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest)?.result;
      db.createObjectStore("images", { keyPath: "url" });
    };
    request.onsuccess = (event: any) => {
      resolve(event.target?.result);
    };
    request.onerror = (event: any) => {
      reject(event.target?.error);
    };
  });
}

function storeImage(url: any, blob: any) {
  return openDatabase().then((db: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("images", "readwrite");
      const store = transaction.objectStore("images");
      const request = store.put({ url, blob });
      request.onsuccess = () => resolve(true);
      request.onerror = (event: any) => reject(event.target.error);
    });
  });
}
function getImage(url: any): Promise<any> {
  return openDatabase().then((db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("images", "readonly");
      const store = transaction.objectStore("images");
      const request = store.get(url);
      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  });
}
export { openDatabase, storeImage, getImage };
