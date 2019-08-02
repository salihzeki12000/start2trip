import React from 'react';
import { connect } from 'react-redux';
import './affiliateProgram.css'
import income from '../media/income.svg'
import share from '../media/share.svg'
import invite from '../media/invite.svg'
import fn_moneybox from '../media/fn_moneybox.svg'
import IT_link from '../media/IT_link.svg'
import fn_stock from '../media/fn_stock.svg'

import Header from '../header/Header';


class affiliateProgramClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayEl: [
                {
                    img: invite,
                    title: "Приглашайте",
                    text: "Рассылайте приглашения со скидкой 15% \n на первую поездку знакомым-путешественникам,\n нажав на кнопку 'Пригласить друга',\n или отправляйте Вашу партнёрскую ссылку."
                },
                {
                    img: income,
                    title: "Получайте доход",
                    text: "Приглашайте водителей работать в системе Tripfer, \n и получайте доход от выполненных ими заказов."
                },
                {
                    img: share,
                    title: "Делитесь",
                    text: "Пишите о нас статьи, коментируйте в соц.сетях,\n блогах и форумах, и зарабатывайте. Пожизненно.\n Выплаты на банковскую карту еженедельно."
                },
            ],
            arrayFooterEl: [
                {
                    img: IT_link,
                    title: "Ссылка",
                    text: "Когда пользователь переходит по Вашей \n ссылке, мы помечаем его устройство \n специальной меткой сроком на 1 год, чтобы \n понять, что он пришел по Вашей рекомендации."
                },
                {
                    img: fn_stock,
                    title: "Водитель / Партнер",
                    text: "Зарегистрировавшись в системе как водитель или \n партнер, пользователь начнет приносить\n Вам пассивный доход со своей прибыли. \n Чем лучше он работает и чем больше привлекает \n в систему, тем больше Вы получаете."
                },
                {
                    img: fn_moneybox,
                    title: "Путешественник",
                    text: "Зарегистрировавшись как путешественник,\n пользователь приносит Вам доход с каждой \n поездки. Если в течение 1 года был сделан\n заказ без регистрации, Вы также получите\n отчисления на Ваш счёт."
                },
            ]

        }


    }

    render() {
        return (
            <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper">
                    <div className="affiliateProgram" >
                        <div className="affiliateProgram_Title col-12 p-0">
                            <h2>Партнёрская программа</h2>
                            <p className="col-md-6 col-12 p-0">
                                Постройте Ваш успешный бизнес и получайте пассивный доход <br /> в размере 14% с поездки от комиссии системы.
                            </p>
                            <div className="affiliateProgram_content d-flex flex-column col-md-8 col-12 p-0">
                                {
                                    this.state.arrayEl.map((element, index) =>
                                        <div className="d-flex flex-md-row flex-column align-items-center mb-md-5 mb-3">
                                            <i className="col-md-2 col-3 p-0" style={{ background: "url(" + element.img + ")no-repeat" }} />
                                            <div className="d-flex flex-column align-items-md-start align-items-center col-md-6 col-sm-11 col-12 p-0">
                                                <span>{element.title}</span>
                                                <p>{element.text}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="affiliateProgram_Footer">
                            <h3>Как это работает?</h3>
                            <div className="d-flex flex-md-row flex-column">
                                {this.state.arrayFooterEl.map((element, index) =>
                                    <div className="col-md-4 col-12 mb-md-2 mb-5">
                                        <div className="affiliateProgram_FooterContent  d-flex flex-column align-items-center">
                                            <div className="affiliateProgram_FooterCircle">
                                                <span>{index + 1}</span>
                                            </div>
                                            <span>{element.title}</span>
                                            <p>{element.text}</p>
                                            <i className="mt-auto mb-5" style={{ background: "url(" + element.img + ")no-repeat" }} />
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const affiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(affiliateProgramClass);
export default affiliateProgram;