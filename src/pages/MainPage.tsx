import Navbar from '../components/UI/Navbar';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import Contenido from '../components/Contenido';
import JuegosLista from '../components/Juegos/JuegosLista';
import { gamesData } from '../data/gamesData';
const MainPage = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
      <Navbar />
      <main className="container">
        <Contenido />
        <JuegosLista juegos={gamesData}/>
      </main>
      <CarritoSidebar />
      {/* Confirmacion se maneja desde CarritoSidebar */}
    </div>
  );
};

export default MainPage;