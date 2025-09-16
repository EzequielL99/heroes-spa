import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const idSlugTest = "clark-kent";
    const response = await getHeroAction(idSlugTest);
    const resultImage = response.image;

    expect(typeof response).toBe("object");
    expect(response.slug).toBeDefined();
    expect(response.slug).toEqual(idSlugTest);
    expect(resultImage).toContain("http");
  });

  test("should throw an error if hero is not found", async () => {
    const idSlugTest = "clark-kent2";
    await getHeroAction(idSlugTest).catch((error) => {
      expect(error).toBeDefined();

      const {
        status,
        response: { data },
      } = error;
      expect(status).toBe(404);
      expect(data.message).toEqual("Hero not found");
    });

  });
});
