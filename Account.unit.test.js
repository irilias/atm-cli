const Account = require("./Account");
const FileSystem = require("./FileSystem");
beforeEach(() => {
  jest.restoreAllMocks();
});
describe("#deposit", () => {
  test("It adds balance to an account", async () => {
    const amount = 50;
    const initialBalance = 150;
    const account = await createAccount("TestAccount", initialBalance);
    const spy = jest.spyOn(FileSystem, "write");
    spy.mockReturnValue(Promise.resolve());
    await account.deposit(50);
    expect(account.balance).toBe(amount + initialBalance);
    expect(spy).toHaveBeenCalledWith(account.filePath, amount + initialBalance);
  });
});

describe("#withdraw", () => {
  test("It retrieves an amount from account balance.", async () => {
    const initialBalance = 150;
    const amount = 100;
    const account = await createAccount("TestAccount", initialBalance);
    const spy = jest.spyOn(FileSystem, "write");
    spy.mockReturnValue(Promise.resolve());
    await account.withdraw(amount);
    expect(account.balance).toBe(initialBalance - amount);
    expect(spy).toHaveBeenCalledWith(account.filePath, initialBalance - amount);
  });
  test("It throws en error when the amount to be retrieved is greater than the account's balance.", async () => {
    const initialBalance = 50;
    const amount = 100;
    const account = await createAccount("TestAccount", initialBalance);
    const spy = jest.spyOn(FileSystem, "write");
    spy.mockReturnValue(Promise.resolve());
    expect(async () => {
      await account.withdraw(amount);
    }).rejects.toEqual(new Error());
    expect(account.balance).toBe(initialBalance);
  });
});

/**
 * Creating an account, and setting the internal Balance field.
 * @param {string} name
 * @param {number} balance
 * @returns a new account.
 */
async function createAccount(name, balance) {
  const spy = jest.spyOn(FileSystem, "read");
  spy.mockReturnValue(Promise.resolve(balance));
  const account = await Account.find(name);
  spy.mockClear();
  return account;
}
