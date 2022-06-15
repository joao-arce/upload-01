import type { NextPage } from 'next';
import Master from './master';

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Master />
    </div>
  );
};

export default Home;
