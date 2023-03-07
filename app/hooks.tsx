import { useEffect, useCallback, useState } from "react";

type Status = "idle" | "resolved" | "rejected";

/**
 * Copy text to the native clipboard using the `navigator.clipboard` API
 * Adapted from https://www.benmvp.com/blog/copy-to-clipboard-react-custom-hook/
 */
export function useCopyToClipboard(text: string, timeout = 0) {
  const [status, setStatus] = useState<Status>("idle");

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setStatus("resolved"),
      () => setStatus("rejected")
    );
  }, [text]);

  useEffect(() => {
    if (status === "idle") return;

    const timeoutId = setTimeout(() => setStatus("idle"), timeout);

    return () => clearTimeout(timeoutId);
  }, [status, timeout]);

  return [copy, status] as const;
}
