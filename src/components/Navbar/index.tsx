import CredrailsLogo from '@/assets/images/credrails-logo.png';
import { NavLink, useNavigate } from 'react-router';
import Container from '../Container';
import { Button } from '../Button';
import { LogOutIcon } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '@/lib/context/authContext';

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <nav className="sticky top-0 w-full bg-white py-4">
      <Container>
        <div className="w-full flex justify-between items-center">
          <NavLink to="/">
            <img src={CredrailsLogo} alt="credrails-logo" />
          </NavLink>
          <div className="flex lg:gap-4">
            <NavLink to="/uploads">
              <Button variant={'ghost'}>Uploads</Button>
            </NavLink>
            <NavLink to="/details">
              <Button variant={'ghost'}>Details</Button>
            </NavLink>
            <Button
              className="lg:!px-6 lg:!py-2 !py-1"
              variant={'calendar'}
              onClick={handleLogout}
            >
              <span>
                <LogOutIcon />
              </span>
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
