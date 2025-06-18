import { expect, test } from "@playwright/test";

const MOCK_DATA = [
  {
    createdAt: "2025-05-16T08:27:56.707Z",
    name: "Lynn Rohan",
    avatar: "https://avatars.githubusercontent.com/u/32587856",
    age: 30,
    city: "Lake Marcellus",
    fee: "793.05",
    isBusted: true,
    searchLvl: "Friday",
    id: "1",
  },
  {
    createdAt: "2025-05-16T00:48:53.713Z",
    name: "Catherine Brakus",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg",
    age: 100,
    city: "Lexushaven",
    fee: "523.99",
    isBusted: true,
    searchLvl: "Wednesday",
    id: "2",
  },
  {
    createdAt: "2025-05-16T03:54:58.585Z",
    name: "Wallace Gibson",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg",
    age: 11,
    city: "East Bradley",
    fee: "375.75",
    isBusted: true,
    searchLvl: "Wednesday",
    id: "3",
  },
  {
    createdAt: "2025-05-16T08:10:30.112Z",
    name: "Juana Kirlin",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/99.jpg",
    age: 75,
    city: "South Alysa",
    fee: "930.70",
    isBusted: true,
    searchLvl: "Sunday",
    id: "4",
  },
  {
    createdAt: "2025-05-15T16:53:30.979Z",
    name: "Tommie Rosenbaum PhD",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/93.jpg",
    age: 73,
    city: "West Art",
    fee: "443.45",
    isBusted: true,
    searchLvl: 2,
    id: "5",
  },
  {
    createdAt: "2025-05-16T13:39:34.613Z",
    name: "Laura Osinski",
    avatar: "https://avatars.githubusercontent.com/u/18231562",
    age: 70,
    city: "Denesikboro",
    fee: "936.60",
    isBusted: true,
    searchLvl: 3,
    id: "6",
  },
  {
    createdAt: "2025-05-16T09:51:58.854Z",
    name: "Bob Williamson",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/13.jpg",
    age: 77,
    city: "Fort Shanel",
    fee: "502.25",
    isBusted: true,
    searchLvl: 1,
    id: "7",
  },
  {
    createdAt: "2025-05-15T21:18:25.905Z",
    name: "Beulah Schowalter",
    avatar:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/67.jpg",
    age: 69,
    city: "North Stanford",
    fee: "909.39",
    isBusted: true,
    searchLvl: 4,
    id: "8",
  },
  {
    createdAt: "2025-05-15T15:57:03.584Z",
    name: "Faith Weimann",
    avatar: "https://avatars.githubusercontent.com/u/23550340",
    age: 81,
    city: "Edythview",
    fee: "754.51",
    isBusted: true,
    searchLvl: "Wednesday",
    id: "9",
  },
  {
    createdAt: "2025-05-16T14:56:44.369Z",
    name: "Irving Zboncak",
    avatar: "https://avatars.githubusercontent.com/u/81777640",
    age: 27,
    city: "Muncie",
    fee: "704.69",
    isBusted: true,
    searchLvl: "Sunday",
    id: "10",
  },
  {
    createdAt: "2025-05-16T03:05:18.804Z",
    name: "Lee Cassin III",
    avatar: "https://avatars.githubusercontent.com/u/85124964",
    age: 64,
    city: "South Christianacester",
    fee: "351.89",
    isBusted: true,
    searchLvl: 1,
    id: "11",
  },
  {
    createdAt: "2025-05-16T00:36:51.340Z",
    name: "Marguerite Schumm",
    avatar: "https://avatars.githubusercontent.com/u/88928909",
    age: 11,
    city: "Lake Wilberborough",
    fee: "598.99",
    isBusted: false,
    searchLvl: "Monday",
    id: "12",
  },
];
test.describe("Offender List", () => {
  test("Load Offenders Mock", async ({ page }) => {
    await page.route("**/api/wanted*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DATA),
      });
    });

    await page.goto("/");

    let offenderCard = page.getByTestId("offender-card");
    await expect(page.getByTestId("loader-offender")).toBeHidden();
    await expect(offenderCard).toHaveCount(12);
    offenderCard.last().scrollIntoViewIfNeeded();
    offenderCard = page.getByTestId("offender-card");
    await expect(offenderCard).toHaveCount(24);
  });
});
