import { Group } from '../components/index.js';

const MyGroups = () => {

  return (
    <div className="page">
      <br />
      <h6>Projekte verwalten</h6>
      <Group func={'getMyGroups'} />
    </div>
  );
}

export default MyGroups;