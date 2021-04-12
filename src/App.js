import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container, FormControl, Button } from "react-bootstrap";

import Form from "./form";
import "./app.css";

let stripePromise;

function App() {
  const [stripeAPIKey, setStripeAPIKey] = useState("");
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);

  const configStripe = () => {
    // stripePromise = loadStripe(
    //   "pk_test_51If86oLchKy1yIgGuvacmNlNsYhDAlQpFrMywFeCAqbSqtSfB13xxlmREU9ofI2qg17EA1EJw9YxvB3gowykwdW000pDwD7iOP"
    // );

    if (!stripeAPIKey) {
      return alert("Please enter stripe publishable key");
    }

    stripePromise = loadStripe(stripeAPIKey);
    setIsStripeLoaded(true);
  };

  const handleChange = (e) => {
    setStripeAPIKey(e.nativeEvent.target.value);
  };

  return (
    <div id="main-container">
      {!!isStripeLoaded ? (
        <Elements stripe={stripePromise}>
          <Form />
        </Elements>
      ) : (
        <Container>
          <FormControl
            value={stripeAPIKey}
            onChange={handleChange}
            placeholder="Place stripe publishable key here"
          />
          <Button
            style={{ marginTop: "10px" }}
            variant="dark"
            onClick={configStripe}
            block
          >
            Init Stripe
          </Button>
        </Container>
      )}
    </div>
  );
}

export default App;
