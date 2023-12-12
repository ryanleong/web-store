import React from 'react';

interface FooterProps {}

const classes = {
  wrapper: 'bg-neutral-100 mt-auto',
  container: 'container mx-auto px-4 flex py-6',
  text: 'text-sm text-neutral-700',
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <p className={classes.text} data-testid="footer-message">
          © 2023 Johnny Silverhand Inc. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
