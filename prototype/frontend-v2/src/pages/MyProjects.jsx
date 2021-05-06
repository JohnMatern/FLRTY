import { Project } from '../components/index.js';

const MyProjects = () => {

  return (
    <div className="page">
      <Project func={'getMyProjects'} />
    </div>
  );
}

export default MyProjects;