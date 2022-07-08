import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useSelector((state) => state.user);

  if (repos.length === 0) {
    return <Wrapper></Wrapper>;
  }

  const languagesCount = getLanguages(repos, 'count');
  const newLanguagesCount = getBiggestLanguages(languagesCount);

  const languagesStars = getLanguages(repos, 'stargazers_count');
  const newLanguagesStars = getBiggestLanguages(languagesStars);

  const mostPopular = chooseBig(repos, 'stargazers_count');
  const mostForked = chooseBig(repos, 'forks_count');

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={newLanguagesCount} />
        <Column3D data={mostPopular} />
        <Doughnut2D data={newLanguagesStars} />
        <Bar3D data={mostForked} />
      </Wrapper>
    </section>
  );
};

function getLanguages(repos, property) {
  const languages = [...new Set(repos.map(({ language }) => language))].filter(
    (isLanguageNull) => isLanguageNull,
  );

  const languageUse = languages.map((language) => {
    const count = repos.reduce((total, repo) => {
      if (repo.language === language) {
        switch (property) {
          case 'count':
            return total + 1;
          case 'stargazers_count':
            return total + repo[property];
          default:
            return total;
        }
      } else {
        return total;
      }
    }, 0);
    return {
      label: language,
      value: count,
    };
  });

  return languageUse;
}

function getBiggestLanguages(data, amount = 5) {
  const newData = [...data];

  if (newData.length < amount + 1) {
    return newData;
  }

  newData.sort((first, second) => {
    return second.value - first.value;
  });

  const reducedData = newData.slice(0, amount);
  const removedData = newData.slice(amount);
  const otherValue = removedData.reduce((total, { value }) => {
    return total + value;
  }, 0);

  reducedData.push({
    label: 'Others',
    value: otherValue,
  });

  return reducedData;
}

function chooseBig(repos, property, { max = true, howMany = 6 } = {}) {
  const newRepos = [...repos];
  const filteredRepos = newRepos
    .sort((a, b) =>
      max === true ? b[property] - a[property] : a[property] - b[property],
    )
    .slice(0, howMany);

  return filteredRepos.map((repo) => ({
    label: repo.name,
    value: repo[property],
  }));
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
