//Кнопка выхода
const logoutButton = new LogoutButton;

logoutButton.action = () => {
    ApiConnector.logout(callback => {
        if (callback.success) {
            location.reload();
        };
    });
};

//Загрузка информации о пользователе

ApiConnector.current(callback => {
    if (callback.success) {
        ProfileWidget.showProfile(callback.data);
    };
});

//Операции с деньгами

const ratesBoard = new RatesBoard;

function getRate() {
    ApiConnector.getStocks(callback => {
        if (callback.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data);
        };
    });
};

getRate()

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Баланс пополнен');
        } else {
            moneyManager.setMessage(callback.success, callback.error);
        };
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Конвертация успешна');
        } else {
            moneyManager.setMessage(callback.success, callback.error);
        };
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Перевод выполнен');
        } else {
            moneyManager.setMessage(callback.success, callback.error);
        };
    })
};

//Операции с избранным

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites(callback => {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(data);
    };
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(callback.success, 'Пользователь добавлен в избранное');
        } else {
            favoritesWidget.setMessage(callback.success, callback.error)
        };
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, callback => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(callback.success, 'Пользователь удален из избранного');
        } else {
            favoritesWidget.setMessage(callback.success, callback.error)
        };
    });
};