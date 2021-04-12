import { useState } from "react";
import { Container, Button, Jumbotron } from "react-bootstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Loader from "./loader";

const Form = () => {
  const [cardToken, setCardToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      alert(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardToken(paymentMethod.id);
    }

    setIsLoading(false);
  };

  return (
    <Container id="container">
      <div id="form">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <Button
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
        variant="dark"
        block
      >
        Get Token
      </Button>
      <Jumbotron style={{ marginTop: "10px" }}>
        <p>Card Token:</p>
        {!cardToken ? <p>Please submit above form</p> : <p>{cardToken}</p>}
      </Jumbotron>
      {isLoading && <Loader />}
    </Container>
  );
};

export default Form;
