import * as React from "react";
import { Input } from "../../input";

interface SegmentedInputProps {
  length?: number; // number of segments, default 4
  segmentLength?: number; // characters per segment, default 4
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function SegmentedInput({
  length = 4,
  segmentLength = 4,
  value,
  onChange,
  placeholder = "0000",
  inputProps = {},
}: SegmentedInputProps) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Split value into segments
  const segments: string[] = [];
  for (let i = 0; i < length; i++) {
    segments.push(value.slice(i * segmentLength, (i + 1) * segmentLength));
  }

  // Handle input change
  const handleChange = (i: number, val: string) => {
    const newSegments = [...segments];
    newSegments[i] = val.slice(0, segmentLength);
    const newValue = newSegments.join("");
    onChange(newValue);

    // Auto-focus next
    if (val.length === segmentLength && i < length - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  // Handle backspace to move focus
  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && segments[i] === "" && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").replace(/[^a-zA-Z0-9]/g, "");
    if (pasted.length === length * segmentLength) {
      onChange(pasted);
      e.preventDefault();
      refs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {segments.map((seg, i) => (
        <React.Fragment key={i}>
          <Input
            ref={(el) => (refs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={segmentLength}
            className="w-16 text-center border rounded-md py-2 px-0 text-lg font-mono text-muted-foreground bg-transparent focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={seg}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            placeholder={placeholder}
            pattern="[0-9X]*"
            required
            {...inputProps}
          />
          {i < length - 1 && (
            <span className="text-xl text-muted-foreground select-none">-</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
