const Account = require("./Account");
const fs = require("fs");

beforeEach(() => {
  try {
    fs.mkdirSync("accounts");
  } catch (error) {
    // folder already exists
  }
});
afterEach(() => {
  fs.rmSync("accounts", { recursive: true, force: true });
});
describe(".create", () => {
  test("Create and return a new account.", async () => {
    const accountName = "Ilyas";
    const account = await Account.create(accountName);
    expect(account.name).toBe(accountName);
    expect(account.balance).toBe(0);
    expect(fs.readFileSync(account.filePath).toString()).toBe("0");
  });
});
describe(".find", () => {
  test("Finding an existing account.", async () => {
    const accountName = "Ilyas";
    const balance = 100;
    fs.writeFileSync(`accounts/${accountName}.txt`, balance.toString());
    const accountFound = await Account.find(accountName);
    expect(accountFound.name).toEqual(accountName);
    expect(accountFound.balance).toEqual(balance);
  });

  test("Account not found", async () => {
    const accountName = "Ilyas";
    const accountNotFound = await Account.find(accountName);
    expect(accountNotFound).toBeUndefined();
  });
});
