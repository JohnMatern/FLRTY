import { Moki } from '../components/Contracts/index.js'

const Home = () => {

  return (
    <div className="page">
      <Moki func={'transfer'} />
    </div>
  );
}

export default Home;