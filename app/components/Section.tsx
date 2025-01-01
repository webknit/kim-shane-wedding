import React from "react";

interface SectionProps {
  children: React.ReactNode;
  classes?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, classes = "", id }) => {
  return (
    <div className={`relative pt-8 pb-8 md:pt-12 md:pb-12 ${classes}`} id={id}>
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
};

export default Section;
