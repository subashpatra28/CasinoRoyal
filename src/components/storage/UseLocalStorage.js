const PREFIX = "royalcasino-";

function SaveLocalStorage(info, action) {
  const prefixedKey = PREFIX + action.key;

  if (action.type === "LOGIN") {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue === null) {
      localStorage.setItem(
        prefixedKey,
        JSON.stringify([{ username: info.username, money: 9.99 }])
      );
      return { username: info.username, money: 9.99 };
    } else {
      const newJsonValue = JSON.parse(jsonValue);

      if (
        !newJsonValue.some((user) => {
          return user.username === info.username;
        })
      ) {
        localStorage.setItem(
          prefixedKey,
          JSON.stringify([
            ...newJsonValue,
            { username: info.username, money: 9.99 },
          ])
        );
        return { username: info.username, money: 9.99 };
      } else {
        let users = JSON.parse(localStorage.getItem(prefixedKey)).find(
          (user) => user.username === info.username
        );

        return { username: users.username, money: users.money };
      }
    }
  }
  if (action.type === "TABLE_DATA") {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue === null) {
      localStorage.setItem(prefixedKey, JSON.stringify([info]));
      return JSON.parse(localStorage.getItem(prefixedKey));
    } else {
      let newGameData = [...JSON.parse(jsonValue), info];
      localStorage.setItem(prefixedKey, JSON.stringify(newGameData));
      return newGameData;
    }
  }
  if (action.type === "MONEY") {
    let jsonValue = JSON.parse(localStorage.getItem(prefixedKey));

    if (jsonValue != null) {
      let userIndex = jsonValue.findIndex(
        (user) => user.username === info.username
      );
      if (userIndex !== -1) {
        jsonValue[userIndex].money = info.money;

        localStorage.setItem(prefixedKey, JSON.stringify(jsonValue));
      }
    }
  }
}

export function gameHistoryStorage() {
  const tableHistory =
    JSON.parse(localStorage.getItem("royalcasino-GAME-HISTORY")) || [];
  return tableHistory;
}

export default SaveLocalStorage;
