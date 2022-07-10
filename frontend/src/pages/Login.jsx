import { useState, useEffect, useContext } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { SiteContext } from '../context/siteContext';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const { siteData, setSiteData } = useContext(SiteContext);

  useEffect(() => {
    if (siteData.isError) {
      toast.error(siteData.message);
    }

    if (siteData.isSuccess || siteData.user) {
      navigate('/');
    }
  }, [siteData]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    axios
      .post(BASE_URL + '/api/users/login', userData)
      .then((res) => {
        if (res.data) {
          setSiteData({ ...siteData, user: res.data });
          localStorage.setItem('user_infov1', JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        setSiteData({ ...siteData, isError: true, message: e.message });
      });
  };

  if (siteData.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting notes</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
