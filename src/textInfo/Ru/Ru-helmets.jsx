const helmets /*helmetStorage - aka armory */ = {
    lang: 'RUS',
    driverConfirmation: {
        basic: {
            title: 'Подтверждение поездки',
            description: 'Подтверждение поездки'
        }
    },
    driverProfile: {
        basic: {
            title: ['Водитель ',' | Автомобиль ','| Информация о поездке'],
           
            description: "Tripfer driverProfile" 
        }
    },
    guideProfile:{
        basic: {
            title: ['Гид ', ', данные профиля, автомобилей, список туров.'],
            description: ['Страница гида ', ', профиль, автомобили, список туров']
        }
    },
    tripConfirmation: {
        basic: {
            title: "Подтверждение заказа",
            description: "Подтверждение заказа"
        }
    },
    drivers: {
        route: {//когда выбран маршрут
            title: ['Как добраться из',' | Заказать трансфер онлайн, выгода до 40%'],
            description: "Tripfer in drivers" 
        },
        country: {//выбрана только страна
            title: ', предложения водителей',
            description: "Tripfer in drivers"
        }
    },
    aboutService: {
        basic: {
            title: 'О сервисе',
            description: "О сервисе tripfer.com"
        }
    },
    affiliateProgram: {
        basic: {
            title: 'Нашим партнёрам',
            description: "Нашим партнёрам"
        }
    },
    contacts: {
        basic: {
            title: 'Наши контакты',
            description: 'Наши контакты'
        }
    },
    licenseAgreement: {
        basic: {
            title: 'Лицензионное соглашение',
            description: 'Лицензионное соглашение'
        }
    },
    home: {
        country: {//когда страна загрузилась
            title: ['Экскурсии, трансферы по ', ' | Конструктор поездок, цены онлайн'],
            description: ['Заказать трансфер по ', '. Спланируйте любую поездку самостоятельно. Бесплатные остановки по маршруту для фото и посещения. Без предоплаты. Дешевле чем такси'],
        }
       
    },
    homeBodyBottom: {
        basic: {
            title: ['Экскурсии из ',' | Конструктор поездок, цены онлайн'],
            description: ['Трансферы из ', ' к интересным местам по собственному маршруту. Онлайн конструктор. Без предоплаты. Бесплатные остановки по маршруту для фото и посещения'],
        }
    },
    placeDescription: {
        object: {//когда загружено
            title: ', как добраться | Режим работы, стоимость билетов | Отзывы туристов',
            description:', информация для туристов. Время работы и стоимость билетов, фото. Узнайте как добраться из любой точки страны. Постройте свой маршрут онлайн'
        }
    },
    places: {
        direction: {//когда выбрано направление
            title: ['Достопримечательности ', ', как добраться | Заказ поездок онлайн'],
            description: ['Путеводитель по ', '. Интересные места, достопримечательности. Перевозки по ', ' от местных водителей. Конструктор индивидуальных маршрутов'],
        },
        country: {//стандартно - только страна
            title: ['Достопримечательности ', ', как добраться | Заказ поездок онлайн'],
            description: ['Путеводитель по ', '. Интересные места, достопримечательности. Перевозки по ', ' от местных водителей. Конструктор индивидуальных маршрутов'],
        },
    },
    guides:{
        country:{
            title: ['Гиды ', ', рейтинги, количество предоставляемых туров.'],
            description: ['Гиды по ','. Список гидов, оценки, количество отзывов.']
        }
    },
    accountRedirector: {
        object: {//когда загружено акк
            title: "Ваш аккаунт на Tripfer",
            description: "Ваш аккаунт на Tripfer"
        }
    },
    authModalCountry: {
        basic: {
            title: "Выберите интересующий Вас регион",
            description: "Выберите интересующий Вас регион"
        }
    },
    authRedirect: {
        basic: {
            title: 'Вход на сайт tripfer.com',
            description: 'Авторизация'
        }
    },
    forgotPassword: {
        basic: {
            title: 'Восстановление пароля к личному кабинету',
            description:'Восстановление пароля'
        }
    },
    registration: {
        basic: {
            title:'Регистрация на сайте tripfer.com',
            description: 'Регистрация'
        }
    },
    resetPassword: {
        basic: {
            title: 'Введите новый пароль',
            description: 'Введите новый пароль'
        }
    },
    routeDescription: {
        basic: {//загружено
            title: ' | Заказать поездку онлайн',
            description: '. Предложения от местных водителей. Заказ без предоплаты. Бесплатные остановки по маршруту для фото и посещения'
        }
    
    },
    feedback:{
        title: "Оставьте отзыв о Вашей поездке",
        description: "Оставьте отзыв о Вашей поездке"
    },
    customerCancel: {
        title: "Вы действительно хотите отказаться от поездки?",
        description: "Вы действительно хотите отказаться от поездки?"
    }
}
export default helmets;