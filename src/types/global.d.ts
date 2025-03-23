interface NotFoundProps {
  title?: string;
  description?: string;
}

interface ModalProps {
  children: React.ReactElement;
  open: boolean;
  onClose?: () => void;
}
