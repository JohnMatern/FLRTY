import { Project, Group } from '../components/index.js';

const Home = () => {

  return (
    <div className="page">
      <Project func={'getProjects'} />
      {/*<Group func={'getGroups'} /> */}
    </div>
  );
}

export default Home;