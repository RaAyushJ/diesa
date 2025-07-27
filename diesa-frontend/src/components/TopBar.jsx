import { Navbar, Nav, Container, Image } from 'react-bootstrap';


function TopBar({ user }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>{user.name || "Your Name"}</Navbar.Brand>
        <Nav className="ms-auto">
          <Image
            src={user.profilePic || "/default-profile.png"}
            roundedCircle
            width={40}
            height={40}
            alt="profile"
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopBar;
