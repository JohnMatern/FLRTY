import { Project } from '../components/index.js';
import { useParams } from 'react-router-dom'

const ProjectPage = () => {
  let { address } = useParams();
  return (
    <div>
      <Project func={"getSingleProject"} address={address} />
    </div>
  );
}

export default ProjectPage;