import classes from "./newsletter-registration.module.css";
import React, { useState } from "react";

function NewsletterRegistration() {
  const [signedUp, setSignedUp] = useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  async function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value;
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setSignedUp(true);
      emailRef.current!.value = "";
      setTimeout(() => {
        setSignedUp(false);
      }, 3000);
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
      {signedUp && (
        <p className="center">Success! You are signed up for the newsletter!</p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
