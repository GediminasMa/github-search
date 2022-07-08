import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

  if (Object.keys(data).length === 0) {
    return <Wrapper></Wrapper>;
  }

  const { public_repos, public_gists, followers, following } = data;
  return (
    <Wrapper className='section-center'>
      {[
        {
          name: 'Repos',
          count: public_repos,
          react_icon: <GoRepo className='icon' />,
          color: 'pink',
        },
        {
          name: 'Followers',
          count: followers,
          react_icon: <FiUsers className='icon' />,
          color: 'green',
        },
        {
          name: 'Following',
          count: following,
          react_icon: <FiUserPlus className='icon' />,
          color: 'purple',
        },
        {
          name: 'Gists',
          count: public_gists,
          react_icon: <GoGist className='icon' />,
          color: 'yellow',
        },
      ].map(({ name, count, react_icon, color }, index) => {
        return (
          <article className='item' key={index}>
            <span className={color}>{react_icon}</span>
            <span>
              <h3>{count}</h3>
              <p>{name}</p>
            </span>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
