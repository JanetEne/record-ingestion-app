import CredrailsLogo from '@/assets/images/credrails-logo.png';
import { NavLink } from 'react-router';
import Container from '../Container';
import { Button } from '../Button';

const NavBar = () => {
  return (
    <nav className="sticky top-0 w-full bg-white py-4">
      <Container>
        <div className="w-full flex justify-between items-center">
          <NavLink to="/main/dashboard">
            <img src={CredrailsLogo} alt="credrails-logo" />
          </NavLink>
          <div className="flex gap-8">
            <NavLink to="/main/uploads">
              <p className="text-lg font-medium text-[#101828]">Uploads</p>
            </NavLink>
            <NavLink to="/main/details">
              <p className="text-lg font-medium text-[#101828]">Details</p>
            </NavLink>

            <Button>Logout</Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
