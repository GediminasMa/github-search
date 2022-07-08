import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  toggleError,
  searchUser,
  checkRequests,
} from '../context/features/userSlice';

const Search = () => {
  const dispatch = useDispatch();
  const { remaining, limit, error, isLoading } = useSelector(
    (state) => state.user,
  );
  const [user, setUser] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(searchUser(user));
    dispatch(checkRequests());
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setUser(value);
  };

  const handleBlur = () => {
    if (user.length < 3) {
      dispatch(
        toggleError({
          show: true,
          message: 'At least 3 characters need to be entered',
        }),
      );
    } else if (error.show) {
      dispatch(
        toggleError({
          show: false,
          message: '',
        }),
      );
    }
  };

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {error.show && (
          <ErrorWrapper>
            <p>{error.message}</p>
          </ErrorWrapper>
        )}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch />
            <input
              type='text'
              value={user}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='enter github user'
            />
            {remaining > 0 && !isLoading && <button>Search</button>}
          </div>
        </form>
        <h3>
          Requests: {remaining}/{limit}
        </h3>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
