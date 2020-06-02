
export class EntityIDB {

    constructor(p_entity){
        this.ENTITIES = [
                            {entity:'productos', indexes:['name']},
                            {entity:'pedidos', indexes:['date','done']},
                            {entity:'ventas', indexes:['date']}
                        ];
        this._idb =  indexedDB;
        this._version = 2;
        this._request = this._idb.open('chimi', this._version);
        this._entity = p_entity;
        this._loaded = this._initialize();
    }

    _initialize() {
        // console.log(this._request.objectStoreNames.findIndex(x => x === this._entity));
        return new Promise( (resolve,reject) => {
            this._request.onsuccess =() => {
                this._db = this._request.result;
                resolve(true)
            }

            this._request.onupgradeneeded = (event) => {
                this._db = event.target.result;
                const upgradeTransaction = event.target.transaction;
                this.ENTITIES.forEach( x => {
                    let objectStore;
                    if (!this._db.objectStoreNames.contains(x.entity)) {
                        objectStore = this._db.createObjectStore(x.entity,{autoIncrement:true});
                    } else {
                        objectStore = upgradeTransaction.objectStore(x.entity);
                    }
                    x.indexes.forEach( y => {
                        if (!objectStore.indexNames.contains(y)) {
                            objectStore.createIndex( y, y, {unique:false});
                        }

                    })
                })
            }

            this._request.onerror = (error) => {
                console.log('ERROR', error);
                resolve(false)
            }
        })

    }

    addItem(data) {
        const transaction = this._db.transaction(this._entity,"readwrite");
        const objStore = transaction.objectStore(this._entity);
        const req = objStore.add(data);
        return new Promise(((resolve) => {
            req.onsuccess = () => {
                resolve (true);
            }
        }))
    }

    getItem(key) {
        const transaction = this._db.transaction(this._entity,"readonly");
        const objStore = transaction.objectStore(this._entity);
        const req = objStore.get(key);
        return new Promise(((resolve) => {
            req.onsuccess = (e) => {
                resolve (e.target.result);
            }
        }))
    }

    async countItems(){
        await this._loaded;
        const transaction = this._db.transaction(this._entity,"readonly");
        const objStore = transaction.objectStore(this._entity);
        const req = objStore.count();
        return new Promise(((resolve) => {
            req.onsuccess = (e) => {
                resolve (e.target.result);
            }
        }))
    }

    updateItem(data, key) {
        const transaction = this._db.transaction(this._entity,"readwrite");
        const objStore = transaction.objectStore(this._entity);
        const req = objStore.put(data,key);
        return new Promise(((resolve) => {
            req.onsuccess = (e) => {
                resolve (e.target.result);
            }
        }))
    }

    removeItem(key) {
        const transaction = this._db.transaction(this._entity,"readwrite");
        const objStore = transaction.objectStore(this._entity);
        const req = objStore.delete(key);
        return new Promise(((resolve) => {
            req.onsuccess = (e) => {
                resolve (true);
            }
        }))
    }

    async getAllItems(index = null) {
        await this._loaded;
        const transaction = this._db.transaction(this._entity,"readonly");
        const objStore = transaction.objectStore(this._entity);
        let request;
        if (index){
            request = objStore.index(index).openCursor();
        }else{
            request = objStore.openCursor();
        }
        let items = [];

        return new Promise((resolve) => {
            request.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor){
                    items.push({key:cursor.primaryKey, value:cursor.value});
                    cursor.continue();
                }else{
                    resolve(items);
                }
            }
        })
    }

    async getFilteredItems(index,filters) {
        await this._loaded;
        const transaction = this._db.transaction(this._entity,"readonly");
        const objStore = transaction.objectStore(this._entity);
        let request;
        let keyRange;

        switch (filters.filter) {
            case 'only':
                keyRange = IDBKeyRange.only(filters.value);
                break;

            case 'bound':
                keyRange = IDBKeyRange.bound(filters.value1, filters.value2);
                break;
        }

        let items = [];
        request = objStore.index(index).openCursor(keyRange);
        return new Promise((resolve) => {
            request.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor){
                    items.push({key:cursor.primaryKey, value:cursor.value});
                    cursor.continue();
                }else{
                    resolve(items);
                }
            }
        })


    }

}
