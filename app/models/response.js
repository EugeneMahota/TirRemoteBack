const response = (errorDB, result) => {
    if(errorDB) {
        return {status: 500, msg: 'Ошибка БД:' + ' ' + errorDB.sqlMessage};
    } else {
        try {
            const res = result[0][0];
            if (res.status) {
                return {status: 200, msg: 'Операция выполнена успешно!'};
            } else {
                return {status: 400, msg: res.msg};
            }
        } catch (err) {
            return {status: 500, msg: 'Ошибка сервера:' + ' ' + err.message};
        }
    }
};


const responseData = (errorDB, result) => {
    if(errorDB) {
        return {status: 500, msg: 'Ошибка БД:' + ' ' + errorDB.sqlMessage};
    } else {
        try {
            const res = result[0];
            if (res.length > 0) {
                return {status: 200, data: res};
            } else {
                return {status: 400, msg: 'Список пуст!'};
            }
        } catch (err) {
            return {status: 500, msg: 'Ошибка сервера:' + ' ' + err.message};
        }
    }
};

const errorValid = (errors) => {
    return {status: 400, msg: errors[0].msg};
};

module.exports = {
    response,
    responseData,
    errorValid
};

