import { useEffect, useState } from 'react';

import Card from './components/Card'

import { saveDoc, docById, getQuery, updateDocById, getAllDocs, removeDoc, subscribeToCollection } from './firebase';

import './App.css'

function App() {
  const [values, setValues] = useState(null)
  const [links, setLinks] = useState([])
  const [current, setCurrent] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (current) {
      // update
      // const {id: noMeIntersa, ...data} = values
      delete values.id
      await updateDocById('links', current, values)
    } else {
      await saveDoc('links', values);
    }
    setValues(null)
    setCurrent(null)
  }

  const subscribeCallback = (querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setLinks(docs)
  }

  const getAllLinksRealTime = async () => {
    subscribeToCollection('links', subscribeCallback)
  }

  const getAllLinks = async () => {
    try {
      const snapshots = await getAllDocs('links')
      const docs = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setLinks(docs)
    } catch (error) {

    }
  }

  const onDelete = async (id) => {
    await removeDoc('links', id)
  }

  const onCurrent = async (id) => {
    const doc = await docById('links', id)
    setValues({...doc, id })
    setCurrent(id)

    // updateDocById('links', doc, values)
  }

  useEffect(() => {
    // getAllLinks()
    getAllLinksRealTime()
    getQuery('links')
  }, [])

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          name="link"
          type="url"
          placeholder="Enter url"
          onChange={handleChange}
          value={values?.link}
        />
        <input name="title" value={values?.title}  type="text" placeholder="Enter Title"  onChange={handleChange} />
        <textarea name="description" cols="30" rows="10" onChange={handleChange} value={values?.description}  />
        <button type="submit">{
          current ? 'Update' : 'Add'
        }</button>
      </form>
      <div>
        {links.map((link) => (
          <Card key={link.id} link={link} handleDelete={onDelete} handlerSetCurrent={onCurrent} />
        ))}
      </div>
    </div>
  );
}

export default App;
