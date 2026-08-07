import { describe, expect, it, vi } from "vitest";
import { fetchCdaLevelTimeSeries, fetchCdaLevelValues } from "../levels";

const cdaParams = {
  office: "SWT",
  unit: "ac-ft",
  interval: "1Hour",
  begin: "2026-08-07T12:00:00Z",
  end: "2026-08-07T13:00:00Z",
  timezone: "UTC",
};

describe("level time-series helpers", () => {
  it("uses the exact level time-series operation", async () => {
    const levelsApi = {
      getLevelsWithLevelIdTimeSeries: vi.fn().mockResolvedValue({
        name: "KEYS.Stor.Inst.1Hour.0.Top of Conservation",
        values: [[Date.UTC(2026, 7, 7, 13), 400983.849, 0]],
      }),
    };

    await fetchCdaLevelTimeSeries({
      cdaParams: {
        ...cdaParams,
        levelId: "KEYS.Stor.Inst.0.Top of Conservation",
      },
      levelsApi,
    });

    expect(levelsApi.getLevelsWithLevelIdTimeSeries).toHaveBeenCalledWith(
      expect.objectContaining({
        levelId: "KEYS.Stor.Inst.0.Top of Conservation",
        interval: "1Hour",
      }),
    );
  });

  it("keys latest values by the requested level id and reports progress", async () => {
    const onProgress = vi.fn();
    const levelsApi = {
      getLevelsWithLevelIdTimeSeries: vi
        .fn()
        .mockResolvedValueOnce({
          values: [
            [1, 100, 0],
            [2, 101, 0],
          ],
        })
        .mockResolvedValueOnce({
          values: [
            [1, null, 0],
            [2, 202, 0],
          ],
        }),
    };

    const result = await fetchCdaLevelValues({
      levelIds: ["A.Stor.Inst.0.Top of Conservation", "B.Stor.Inst.0.Top of Flood"],
      cdaParams,
      levelsApi,
      onProgress,
    });

    expect(result).toEqual({
      "A.Stor.Inst.0.Top of Conservation": [2, 101, 0],
      "B.Stor.Inst.0.Top of Flood": [2, 202, 0],
    });
    expect(onProgress).toHaveBeenLastCalledWith(2, 2);
  });
});
