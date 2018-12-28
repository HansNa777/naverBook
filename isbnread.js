fetchBookByISBN(isbn) {
        return fetch(
                `https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${isbn}`, {
                    headers: {
                        "X-Naver-Client-Id": "vTiJhVKTgkFtmAOe1aRw",
                        "X-Naver-Client-Secret": "KNnOp1CgQd"
                    }
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                return responseJson.items[0];
            })
            .catch(error => {
                console.error(error);
            });
