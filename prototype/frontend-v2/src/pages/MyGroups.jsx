import { Group } from '../components/index.js';

const MyGroups = () => {

  return (
    <div className="page">
      <Group func={'getMyGroups'} />
    </div>
  );
}

export default MyGroups;