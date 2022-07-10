import { useEffect, useState, useContext } from 'react';
import { SiteContext } from '../context/siteContext';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import NoteItemForPublic from '../components/NoteItemForPublic';
import { useNavigate } from 'react-router-dom';

function PublicNote() {
  const [noteData, setNoteData] = useState([]);
  const navigate = useNavigate();
  const { siteData, setSiteData } = useContext(SiteContext);

  useEffect(() => {
    if (siteData.isError) {
      console.log(siteData.message);
    }

    if (!siteData.user) {
      navigate('/login');
    }

    axios
      .get(BASE_URL + '/api/notes/public', {
        headers: {
          Authorization: `Bearer ${siteData.user?.token}`,
        },
      })
      .then((res) => {
        setNoteData(res.data);
      });
  }, []);

  return (
    <>
      <section className="heading">
        <p>Public Notes </p>
      </section>
      <section className="content">
        {noteData.length > 0 ? (
          <div className="notes">
            {noteData.map((note) => (
              <NoteItemForPublic key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <h3>You have not set any notes</h3>
        )}
      </section>
    </>
  );
}

export default PublicNote;
