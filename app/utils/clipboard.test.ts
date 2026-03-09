import copy from "copy-to-clipboard";
import { copyPlainText } from "./clipboard";

jest.mock("copy-to-clipboard", () => jest.fn());

describe("copyPlainText", () => {
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(
    global,
    "navigator"
  );

  afterEach(() => {
    jest.resetAllMocks();

    if (navigatorDescriptor) {
      Object.defineProperty(global, "navigator", navigatorDescriptor);
      return;
    }

    // @ts-expect-error test cleanup for optional global
    delete global.navigator;
  });

  test("uses copy-to-clipboard when navigator clipboard API is unavailable", async () => {
    const copyMock = copy as jest.MockedFunction<typeof copy>;
    copyMock.mockReturnValue(true);

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {},
    });

    await expect(copyPlainText("hello")).resolves.toBe(true);
    expect(copyMock).toHaveBeenCalledWith("hello", {
      format: "text/plain",
    });
  });

  test("uses native clipboard API when available", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {
        clipboard: {
          writeText,
        },
      },
    });

    await expect(copyPlainText("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(copy).not.toHaveBeenCalled();
  });

  test("returns false when native clipboard API exists but write fails", async () => {
    const writeText = jest.fn().mockRejectedValue(new Error("denied"));

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {
        clipboard: {
          writeText,
        },
      },
    });

    await expect(copyPlainText("hello")).resolves.toBe(false);
    expect(copy).not.toHaveBeenCalled();
  });
});
