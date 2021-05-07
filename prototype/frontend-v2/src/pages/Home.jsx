import { Project, Group } from '../components/index.js';

const Home = () => {

  return (
    <div className="page">
            <br />
      <h6>Alle Projekte</h6>
      <Project func={'getProjects'} />
      {/*<Group func={'getGroups'} /> */}
    </div>
  );
}

export default Home;