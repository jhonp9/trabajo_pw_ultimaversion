import { FaInfoCircle } from 'react-icons/fa';
import type { ReactNode } from 'react';

type InfoBoxProps = {
  children: ReactNode;
};

export const InfoBox = ({ children }: InfoBoxProps) => {
  return (
    <div className="info-box mt-4">
      <div className="d-flex align-items-center">
        <FaInfoCircle className="me-2" />
        <p className="mb-0">{children}</p>
      </div>
    </div>
  );
};