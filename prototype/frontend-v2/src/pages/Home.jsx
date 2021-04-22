import { Project } from '../components/index.js';

const Home = () => {

  return (
    <div className="page">
      <Project func={'getProjects'} />
    </div>
  );
}

export default Home;