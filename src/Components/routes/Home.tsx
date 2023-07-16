import Form from '../Form/Form';
import MapContainer from '../Map-leaflet/MapContainer';

const Home = () => {
  return (
    <div className='container block h-screen p-0'>
      <Form />
      <MapContainer />
    </div>
  );
};

export default Home;
