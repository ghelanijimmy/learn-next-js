import classes from "./newsletter-registration.module.css";
import React, { useContext, useState } from "react";
import NotificationContext from "@/store/notification-context";
import { STATUS } from "@/components/notification/notification";

function NewsletterRegistration() {
  const [signedUp, setSignedUp] = useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const notificationContext = useContext(NotificationContext);

  async function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    notificationContext.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: STATUS.PENDING,
    });

    const handleRequest = async () => {
      const email = emailRef.current?.value;
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      notificationContext.showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter.",
        status: STATUS.SUCCESS,
      });
      setSignedUp(true);
      emailRef.current!.value = "";
      setTimeout(() => {
        setSignedUp(false);
      }, 3000);
    };

    try {
      await handleRequest();
    } catch (err) {
      notificationContext.showNotification({
        title: "Error!",
        message:
          err instanceof Error ? err.message : String("Something went wrong!"),
        status: STATUS.ERROR,
      });
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
