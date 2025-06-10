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
    const newSegments = value.match(/.{1,4}/g) ?? ["", "", "", ""];
    setSegments([
      newSegments[0] ?? "",
      newSegments[1] ?? "",
      newSegments[2] ?? "",
      newSegments[3] ?? "",
    ]);
  }, [value]);

  const handleSegmentChange = useCallback(
    (index: number, inputValue: string) => {
      const newSegments = [...segments];
      const inputParts = inputValue.toUpperCase().split(/-+/);
      let i = index;
      for (; i < Math.min(index + inputParts.length, segments.length); i++) {
        let current = inputParts[i - index];
        current = current ?? "";
        const rest = current.slice(4);
        if (rest.length > 0 && i < segments.length - 1) {
          inputParts[i - index + 1] = rest + (inputParts[i - index + 1] ?? "");
        }

        const replaceRegex = i < 3 ? /[^\d]/g : /[^\d|X]/g;
        const sanitizedValue = current.replace(replaceRegex, "").slice(0, 4);

        newSegments[i] = sanitizedValue;
      }

      if (i === segments.length) {
        inputRefs.current[i - 1]?.focus();
      } else if (newSegments[i - 1]?.length === 4 && i < segments.length - 1) {
        inputRefs.current[i]?.focus();
      }

      // Join segments and update parent
      const combinedValue = newSegments.join("");
      onChange(combinedValue);
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
        className={`relative w-fit flex items-center justify-center gap-0 ${className ?? ""}`}
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
              type="text"
              inputMode="numeric"
              pattern=".{4,}"
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
