import { useState, useContext } from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { SiteContext } from '../context/siteContext';
function NoteItem({ note }) {
  const { siteData, setSiteData } = useContext(SiteContext);

  const deleteNote = async (id) => {
    axios
      .delete(BASE_URL + '/api/notes/' + id, {
        headers: {
          Authorization: `Bearer ${siteData.user.token}`,
        },
      })
      .then((res) => {
        let newData = siteData.notes.filter((obj) => obj._id !== id);
        setSiteData({ ...siteData, notes: newData });
      });
  };

  return (
    <div className="note">
      <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
      <h2>{note.text}</h2>
      <button onClick={() => deleteNote(note._id)} className="close">
        X
      </button>
    </div>
  );
}

export default NoteItem;
