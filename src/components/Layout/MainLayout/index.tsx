import Container from '@/components/Container';
import NavBar from '@/components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col w-full bg-gray-100">
      <NavBar />
      <div className="flex-1 pt-10">
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;
