import CredrailsLogo from '@/assets/images/credrails-logo.png';
import { NavLink } from 'react-router';
import Container from '../Container';
import { Button } from '../Button';
import { LogOutIcon } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="sticky top-0 w-full bg-white py-4">
      <Container>
        <div className="w-full flex justify-between items-center">
          <NavLink to="/main/dashboard">
            <img src={CredrailsLogo} alt="credrails-logo" />
          </NavLink>
          <div className="flex gap-4">
            <NavLink to="/main/uploads">
              <Button variant={'ghost'}>Uploads</Button>
            </NavLink>
            <NavLink to="/main/details">
              <Button variant={'ghost'}>Details</Button>
            </NavLink>
            <NavLink to="/auth/login">
              <Button className="!px-6 !py-2" variant={'calendar'}>
                <span>
                  <LogOutIcon />
                </span>
                Logout
              </Button>
            </NavLink>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
