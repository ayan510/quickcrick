import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import { onValue, push, ref, set } from 'firebase/database'

export default function Teams() {
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  const teamsRef = ref(db, 'Teams')
  function getItems() {
    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data)
        setList(arr)
      } else {
        setList([])
      }
    });
  }
  function addItem(e) {
    e.preventDefault()
    push(teamsRef, text)
    setText('')
  }
  function deleteItem(id) {
    const delRef = ref(db, 'Teams/' + id)
    set(delRef, null)
  }
  function deleteAll() {
    set(teamsRef, null)
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div>
      <h2>TEAMS</h2>
      <form onSubmit={addItem}>
        <input type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button>ADD</button>
        <button type='button' onClick={deleteAll}>Delete All</button>
      </form>

      <table>
        {list.map((item) =>
          <tr>
            <td>{item[1]}</td>
            <td><button onClick={() => deleteItem(item[0])}>Delete</button></td>
          </tr>)
        }
      </table>
    </div>
  )
}