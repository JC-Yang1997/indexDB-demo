import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Children from '../../components/children'
import './index.less'

let HOME = () => {
  const [database, setDatabase] = useState(null)

  async function connect() { 
    const databases = await window.indexedDB.databases()
    const version = databases.find((item) => (item.name === 'YJC'))?.version || 0
    const nextVersion = version + 1
    var request = window.indexedDB.open("YJC", nextVersion)
    request.onsuccess = function(event) {
      setDatabase(event.target.result)
      console.log('数据库打开成功', database)
    }
    request.onupgradeneeded = function (e) {
      const db = e.target.result
      console.log('初始化表')
      if(!db.objectStoreNames.contains('goods')) {
        let objectStore = db.createObjectStore('goods', { keyPath: 'id' });
        objectStore.createIndex('name', 'name', { umique: false })
        objectStore.createIndex('number', 'number', { umique: false })
      }
    }
  }

  async function insert(table, data) {
    const addDataRequest = database.transaction([table], 'readwrite')
    .objectStore(table)
    .add(data);

    addDataRequest.onsuccess = function(e) {
      console.log('数据写入成功', e);
    }

    addDataRequest.onerror = function (e) {
      console.log('数据写入失败', e);
    }
  }

  async function update(table, data) {
    const addDataRequest = database.transaction([table], 'readwrite')
    .objectStore(table)
    .put(data);

    addDataRequest.onsuccess = function(e) {
      console.log('数据更新成功', e);
    }

    addDataRequest.onerror = function (e) {
      console.log('数据更新失败', e);
    }
  }

  function deleteById(table, id) {
    var request = database.transaction([table], 'readwrite')
      .objectStore(table)
      .delete(id);
  
    request.onsuccess = function (event) {
      console.log('数据删除成功');
    };
  }

  function findById(table, id) {
    var transaction = database.transaction([table]);
    var objectStore = transaction.objectStore(table);
    var request = objectStore.get(id);

    request.onsuccess = function (e) {
      let result = e.target.result
      console.log('查询数据成功', result)
    }

    request.onerror = function (e) {
      console.log('查询数据失败', e)
    }
  }

  function find(table, value, key) {
    var transaction = database.transaction([table], 'readonly');
    var objectStore = transaction.objectStore(table);
    const index = objectStore.index(key)
    const request = index.get(value)
    request.onsuccess = function (e) {
      let result = e.target.result
      console.log('查询数据成功', result)
    }

    request.onerror = function (e) {
      console.log('查询数据失败', e)
    }
  }

  function readAllData(table) {
    var transaction = database.transaction([table]);
    var objectStore = transaction.objectStore(table);
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        console.log(cursor.value)
        cursor.continue();
     }
   };
  }

  return (
    <div>
      <p>home</p>
      <div>
        <button onClick={() => connect()}>连接数据库</button>
      </div>
      <div>
        <button onClick={() => insert('users', { id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' })}>插入数据</button>
      </div>
      <div>
        <button onClick={() => findById('users', 1)}>根据主键查询</button>
      </div>
      <div>
        <button onClick={() => find('users', '李四', 'name')}>根据索引查询</button>
      </div>
      <div>
        <button onClick={() => readAllData('users')}>查询整表数据</button>
      </div>
      <div>
        <button onClick={() => update('users', { id: 5, name: '张四', age: 24, email: 'zhangsan@example.com' })}>更新数据</button>
      </div>
      <div>
        <button onClick={() => deleteById('users', 5)}>删除数据</button>
      </div>
      <Children />
      <Link to="/about"><div>关于</div></Link>
    </div>
  )
}
export default HOME