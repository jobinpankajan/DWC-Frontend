import React from "react";
import { Modal } from "react-bootstrap";

const ReportsModal = ({
  title,
  footerContents,
  bodyContents,
  className,
  show = false,
  fullscreen = false,
  centered = false,
  onHide,
}) => {
  return (
    <>
      <Modal
        className={`modal fade ${className}`}
        show={show}
        fullscreen={fullscreen}
        centered={centered}
        onHide={onHide}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyContents}</Modal.Body>
        <Modal.Footer>{footerContents}</Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportsModal;
