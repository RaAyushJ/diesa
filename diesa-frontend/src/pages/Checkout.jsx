// src/pages/Checkout.jsx
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const handlePayment = async () => {
    // Future Razorpay integration placeholder
    alert("🛠️ Razorpay integration coming soon...");
    
    // Temporary: Simulate successful payment
    setTimeout(() => {
      navigate('/start-journey'); // Or wherever the user should go after payment
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <Card className="p-5 bg-secondary" style={{ width: '28rem' }}>
        <h4 className="text-center mb-4">Ready to Join?</h4>
        <p className="text-center">Pay securely and start your 30-day journey now.</p>
        <Button variant="success" onClick={handlePayment} className="w-100">
          Proceed to Pay
        </Button>
      </Card>
    </div>
  );
}

export default Checkout;