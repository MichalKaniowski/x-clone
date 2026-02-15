import { forwardRef, useCallback } from "react";
import { Textarea, TextareaProps } from "./primitives/textarea";

interface AutoResizeTextareaProps extends TextareaProps {
  className?: string;
}

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, onChange, ...props }, ref) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      // adjusting height of the textarea
      const textarea = event.target;
      textarea.style.height = "auto"; // Reset height to allow shrinking
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height based on scrollHeight

      // making react hook form work
      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  return (
    <div className={className}>
      <Textarea
        {...props}
        ref={ref}
        onChange={handleChange}
        className="p-3 border focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[70px] resize-none"
        placeholder="Type something..."
      />
    </div>
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
