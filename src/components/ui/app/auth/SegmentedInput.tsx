import { Input } from "../../input";
import { useCallback, useEffect, useRef, useState } from "react";

interface SegmentedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SegmentedInput({
  value,
  onChange,
  placeholder = "0",
  className,
}: SegmentedInputProps) {
  const [segments, setSegments] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split the value into segments of 4 digits
    const newSegments = value.match(/.{1,4}/g) || ["", "", "", ""];
    setSegments([
      newSegments[0] || "",
      newSegments[1] || "",
      newSegments[2] || "",
      newSegments[3] || "",
    ]);
  }, [value]);

  const handleSegmentChange = useCallback(
    (index: number, inputValue: string) => {
      // Only allow digits and limit to 4 characters
      const sanitizedValue = inputValue.replace(/[^\d]/g, "").slice(0, 4);

      const newSegments = [...segments];
      newSegments[index] = sanitizedValue;

      // Join segments and update parent
      const combinedValue = newSegments.join("");
      onChange(combinedValue);

      // If we've reached 4 digits and there's a next input, focus it
      if (sanitizedValue.length === 4 && index < segments.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [segments, onChange],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && segments[index] === "" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      }
    },
    [segments],
  );

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        ref={containerRef}
        className={`relative w-fit flex items-center justify-center gap-0 ${className || ""}`}
      >
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-center">
            <Input
              ref={(el) => (inputRefs.current[index] = el)}
              className="max-w-12 w-full text-center p-1"
              value={segment}
              onChange={(e) => handleSegmentChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder={placeholder}
              maxLength={4}
              type="text"
              inputMode="numeric"
              pattern="\d*"
            />
            {index < segments.length - 1 && (
              <span className="mx-1 select-none [&::selection]:bg-transparent [&::selection]:text-transparent">
                -
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
