import { useState, useContext } from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { SiteContext } from '../context/siteContext';
import RectMarkdoen from 'react-markdown';

function NoteForm() {
  const [text, setText] = useState('');
  const [is_public, setIsPublic] = useState(false);
  const { siteData, setSiteData } = useContext(SiteContext);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        BASE_URL + '/api/notes/',
        { text, is_public },
        {
          headers: {
            Authorization: `Bearer ${siteData.user.token}`,
          },
        }
      )
      .then((res) => {
        setSiteData({ ...siteData, notes: [...siteData.notes, res.data] });
      });
    setText('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Note</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={is_public}
            onChange={() => setIsPublic(!is_public)}
            id="public_note"
            style={{ height: '12', marginTop: '4px' }}
          />
          <label className="form-check-label" for="public_note">
            Public Note?
          </label>
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Note
          </button>
        </div>
      </form>
    </section>
  );
}

export default NoteForm;
