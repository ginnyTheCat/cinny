import React from 'react';
import './RawModal.scss';

import Modal from 'react-modal';

import navigation from '../../../client/state/navigation';

Modal.setAppElement('#root');

export type RawModalProps = {
  className?: string;
  overlayClassName?: string;
  isOpen: boolean;
  size?: 'large' | 'medium' | 'small';
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  onRequestClose?: () => void;
  closeFromOutside?: boolean;
  children?: React.ReactNode;
};

export default function RawModal({
  className,
  overlayClassName,
  isOpen,
  size = 'small',
  onAfterOpen,
  onAfterClose,
  onRequestClose,
  closeFromOutside = true,
  children,
}: RawModalProps) {
  let modalClass = (className !== null) ? `${className} ` : '';
  modalClass += `raw-modal__${size} `;

  navigation.setIsRawModalVisible(isOpen);

  const modalOverlayClass = (overlayClassName !== null) ? `${overlayClassName} ` : '';
  return (
    <Modal
      className={`${modalClass}raw-modal`}
      overlayClassName={`${modalOverlayClass}raw-modal__overlay`}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={closeFromOutside}
      shouldCloseOnOverlayClick={closeFromOutside}
      shouldReturnFocusAfterClose={false}
      closeTimeoutMS={300}
    >
      {children}
    </Modal>
  );
}
