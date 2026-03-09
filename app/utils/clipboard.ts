import copy from "copy-to-clipboard";

/**
 * Copy a plain text value to the system clipboard.
 *
 * @param text - the text to copy.
 * @return true if the copy operation was successful.
 */
export async function copyPlainText(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    return copy(text, {
      format: "text/plain",
    });
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return copy(text, {
      format: "text/plain",
    });
  }
}
