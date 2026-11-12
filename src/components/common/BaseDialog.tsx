import React, { useEffect, useRef } from 'react';

export interface BaseDialogProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  closeOnBackdropClick?: boolean;
}

/**
 * BaseDialog - Native HTML5 <dialog> wrapper
 * Tuân thủ Web Baseline Standard:
 * - Tự động đẩy modal vào Top Layer (vượt trên mọi z-index stack)
 * - Tự động hỗ trợ phím Escape qua native 'cancel' event
 * - Native Focus Trap & background scroll locking
 * - Native ::backdrop với hiệu ứng blur
 */
export const BaseDialog: React.FC<BaseDialogProps> = ({
  isOpen = true,
  onClose,
  children,
  className = '',
  ariaLabel,
  closeOnBackdropClick = true
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          // Fallback if already showing or interrupted
        }
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault(); // Ngăn hành vi đóng mặc định không đồng bộ của dialog
    onClose();
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdropClick) return;
    // Khi click vào ::backdrop, trình duyệt tính target là chính thẻ <dialog>
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-modal="true"
      className={`native-modal-dialog select-none ${className}`}
    >
      {children}
    </dialog>
  );
};
