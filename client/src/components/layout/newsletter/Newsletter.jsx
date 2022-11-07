import React from "react";
import Button from "../../formElements/buttons/Button";
import Input from "../../formElements/input/Input";
import "./newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <div className="container flex center paddingTb-3">
        <h2>Keep up to our latest news and events.</h2>
        <form>
          <div className="flex center gap-2">
            <Input
              type="text"
              className="newsletter-input"
              placeholder="Email address..."
            />
            <Button type="secondary">Subscribe</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
