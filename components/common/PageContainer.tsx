import React from "react";
import Container from "@mui/material/Container";

interface IPageContainerProps {
  children: React.ReactNode;
  customMaxWidth?: number;
  fluid?: boolean;
}

const PageContainer: React.FC<IPageContainerProps> = ({
  children,
  customMaxWidth,
  fluid,
}) => {
  const maxWidth = fluid ? "100%" : customMaxWidth ?? "978px";
  const containerStyles: React.CSSProperties = {
    maxWidth,
    minWidth: 300,
    margin: "0 auto",
  };

  return (
    <Container
      sx={containerStyles}
      data-testid="page-container"
      maxWidth={false}
      disableGutters
    >
      {children}
    </Container>
  );
};

export default PageContainer;
