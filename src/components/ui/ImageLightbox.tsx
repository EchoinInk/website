import { useEffect, useId, useRef, useState } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function ImageLightbox({ src, alt, className, loading = "lazy" }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="ei-image-viewer-trigger"
        onClick={() => setOpen(true)}
        aria-label={`Open larger image: ${alt}`}
      >
        <img className={className} src={src} alt={alt} loading={loading} decoding="async" />
        <span aria-hidden="true" className="ei-image-viewer-hint">
          View
        </span>
      </button>

      {open ? (
        <div
          className="ei-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <h2 id={titleId} className="sr-only">
            Enlarged project image
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="ei-image-viewer-close"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <div className="ei-image-viewer-scroll">
            <img src={src} alt={alt} decoding="async" />
          </div>
        </div>
      ) : null}
    </>
  );
}
