export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `movie-maniac` with the version of 1
    const request = indexedDB.open('movie-maniac', 1);
    // create variables to hold reference to the database, tx (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores 
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore('movies', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('watchList', { keyPath: '_id', });
      db.createObjectStore('comments', { keyPath: '_id', })
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log('There was an error');
    };

    // on database open success
    request.onsuccess = function (e) {
      // save a reference of the database to the `db` variable
      db = request.result;

      // save a reference of the database to the `db` variable
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);
      // if there's any errors, let us know
      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }
      // when the tx is complete, close the connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}