import '../../styles/Modal.css';
import { useEffect } from 'react';

const Modal = ({ message, onClose }) => {
      useEffect(() => {
            const handleKeyDown = (e) => {
                  if (e.key === 'Escape') {
                        onClose();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, [onClose]);

      const handleOutsideClick = (e) => {
            if (e.target === e.currentTarget) {
                  onClose();
            }
      };

      return (
            <div className="modal-overlay" onClick={handleOutsideClick} aria-hidden="true">
                  <div className="modal-content" aria-labelledby="modal-title">
                        <p>{message}</p>
                        <button className="modal-close" onClick={onClose}>
                              OK
                        </button>
                  </div>
            </div>
      );
};

export default Modal;
