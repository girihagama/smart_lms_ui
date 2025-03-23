import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link styling
import { FaTachometerAlt, FaBook, FaUsers, FaExchangeAlt } from 'react-icons/fa';

const Sidebar = () => (
  <div style={{ width: '250px', height: '100vh', backgroundColor: '#2D3436', position: 'fixed' }}>
    <Nav className="flex-column text-white p-4">
      <h5 className="text-white mb-4">SMART Library</h5>
      {/* NavLink automatically applies an active class */}
      <Nav.Link as={NavLink} to="/dashboard" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        <FaTachometerAlt size={18} className="me-2" />
        Dashboard
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        Dashboard 1
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        Dashboard 2
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        Dashboard 3
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard/books" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        <FaBook size={18} className="me-2" />
        Books
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard/members" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        <FaUsers size={18} className="me-2" />
        Members
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard/transactions" className="text-white d-flex align-items-center" activeClassName="bg-primary rounded text-white">
        <FaExchangeAlt size={18} className="me-2" />
        Transactions
      </Nav.Link>
    </Nav>
  </div>
);

export default Sidebar;
