import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';
import { SiteContext } from '../context/siteContext';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

function Dashboard() {
  const navigate = useNavigate();
  const { siteData, setSiteData } = useContext(SiteContext);

  const search = useLocation().search;
  let name = new URLSearchParams(search).get('name');

  useEffect(() => {
    if (siteData.isError) {
      console.log(siteData.message);
    }

    if (siteData.data_loaded === true && siteData.user == null) {
      navigate('/login');
    }

    if (name === null) {
      name = '';
    }

    axios
      .get(BASE_URL + '/api/notes?search=' + name, {
        headers: {
          Authorization: `Bearer ${siteData.user?.token}`,
        },
      })
      .then((res) => {
        setSiteData({ ...siteData, notes: res.data });
      });
  }, [name, siteData.user]);

  if (siteData.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {siteData.user && siteData.user.name}</h1>
        <p>Notes Dashboard</p>
      </section>
      <NoteForm /> <br />
      <div className="form-group">
        <input
          type="text"
          style={{ width: '400px', textAlign: 'center' }}
          placeholder="Search notes.."
          onChange={(e) => navigate(`/?name=${e.target.value}`)}
        />
      </div>
      <section className="content">
        {siteData.notes.length > 0 ? (
          <div className="notes">
            {siteData.notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <h3>You have not set any notes</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
