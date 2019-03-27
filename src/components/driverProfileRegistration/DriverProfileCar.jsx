import React, { Component } from 'react';
import './DriverProfileCar.css'
import { connect } from 'react-redux';
import imgCar from './img/images.jpeg'
import jeepIcon from './img/jeep.svg'
import microbusIcon from './img/microbus.svg'
import minivanIcon from './img/minivan.svg'
import sedanIcon from './img/sedan.svg'
import no_smokingIcon from './img/no-smoking.svg'
import seatIcon from './img/seat.svg'
import snowflakeIcon from './img/snowflake.svg'
import wifiIcon from './img/wifi.svg'
import editBlueIcon from './img/editBlue.svg'
import { Collapse } from 'reactstrap';



class DriverProfileCarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {
                month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"],
            },
            dataNumber: [],
            dataYear: [],
            language: ["Грузинский", "Русский", "Корейский", "Хинди"],
            seat: { icon: seatIcon, title: "Кожаный салон" },
            snowflake: { icon: snowflakeIcon, title: "Климот контроль" },
            wifi: { icon: wifiIcon, title: "Бесплатный Wi-Fi" },
            no_smoking: { icon: no_smokingIcon, title: "Курение в салоне запрещено" },
            smoking: { icon: no_smokingIcon, title: "Курение в салоне разрешино" },
            comfort: [],
            carImg: [],
            file: '',
            imagePreviewUrl: '',
            collapse: false,
            newCarCard: {nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", flueType: "" },

        }
        this.toggle = this.toggle.bind(this);
        this.getMassNumbers.bind(this);
        this.getMassYear.bind(this);
        this.addNum = this.addNum.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse , imagePreviewUrl: '', newCarCard:{nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", flueType: "" }, comfort: [], carImg: [], }));
    }

    getMassNumbers(num) {
        let number = [];
        for (let i = 1; i < num; i++) {
            number.push(i)
        }
        return number;
    }

    getMassYear(num) {
        let number = [];
        for (let i = num; i < 2019; i++) {
            number.push(i)
        }
        return number;
    }

    addNum() {
        let newDataNumber = this.getMassNumbers(31);
        let newdataYear = this.getMassYear(1919);
        this.setState({
            dataNumber: newDataNumber,
            dataYear: newdataYear,
        })
    }
    componentDidMount() {
        this.addNum();
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
            this.setState(state => { const carImg = state.carImg.push(reader.result); return carImg });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="driverProfileCarAddNewCarPhotoCarImg" />);
        }

        return (
            <div>
                <div style={{ opacity: this.state.collapse ? "0" : "1" }} className="col-12 d-flex justify-content-center">
                    <button className="driverProfileCarAddNewCarShowButton" onClick={this.toggle}>Добавить Автомобиль</button>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="driverProfileCarAddNewCar d-flex align-items-start col-12">
                        <div className="driverProfileCarAddNewCarPhotoCar" >
                            {$imagePreview}
                            <label htmlFor="addCarFile" >+Добавить фото автомобиля</label>
                            <input type="file" id="addCarFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                        </div>
                        <div className="driverProfileCarAddNewCarInformation d-flex flex-column col-7 p-0">
                            <div className="d-flex align-items-center mb-3">
                                <p className="col-4 p-0">Марка автомобиля:</p>
                                <input value={this.state.newCarCard.nameCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <p className="col-4 p-0">Год автомобиля:</p>
                                <input value={this.state.newCarCard.yearCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <p className="col-4 p-0">Номер автомобиля:</p>
                                <input value={this.state.newCarCard.plateNumberCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <p className="col-4 p-0">Тип автомобиля:</p>
                                <select  value={this.state.newCarCard.typeCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, typeCar: e.currentTarget.value }
                                    })
                                }} name="typeCar">
                                    <option value="sedan">Седан</option>
                                    <option value="microbus">Микроавтобус</option>
                                    <option value="minivan">Минивэн</option>
                                    <option value="jeep">Внедорожник</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <p className="col-4 p-0">Тип топлива:</p>
                                <select value={this.state.newCarCard.flueType} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, flueType: e.currentTarget.value }
                                    }); console.log(this.state.carImg)
                                }} name="typeFuel">
                                    <option value="petrol">Бензин</option>
                                    <option value="diesel">Дизель</option>
                                    <option value="gas">Газ</option>
                                    <option value="hybrid">Гибрид</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-start mb-3">
                                <p className="col-4 p-0">Удобства:</p>
                                <div className="driverProfileCarAddNewCarComfortCheckBox d-flex flex-column pt-1">
                                    <label htmlFor="comfort1">Климат контроль
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.snowflake); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.snowflake), 1); return comfort })
                                        }} type="checkbox" id="comfort1" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort2">Кожаный салон
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.seat); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.seat), 1); return comfort })
                                        }} type="checkbox" id="comfort2" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort3">Бесплатный Wi-Fi
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.wifi); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.wifi), 1); return comfort })
                                        }} type="checkbox" id="comfort3" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort4">Курение в салоне запрещено
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.no_smoking); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.no_smoking), 1); return comfort })
                                        }} type="checkbox" id="comfort4" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort5">Курение в салоне разрешено
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.smoking); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.smoking), 1); return comfort })
                                        }} type="checkbox" id="comfort5" />
                                        <span />
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end mb-5">
                                <button className="mr-5" >Добавить Автомобиль</button>
                                <button className="ml-4 mr-1" onClick={this.toggle}>Отмена</button>
                            </div>
                        </div>
                    </div>
                </Collapse>

                {}
                <div className="driverProfileCarFilledCard d-flex align-items-center col-12">
                    {/* TODO отрисовка автомобилей */}
                    <div className="driverProfileCarFilledCardImg">
                        <img src={imgCar} alt="imgCar" />
                    </div>
                    <div className="driverProfileCarFilledCardInformation d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div className="driverProfileCarFilledCardInformationNameCar d-flex flex-column ">
                                <p>Toyota Prius, 2008</p>
                                <p>WWW-888-WWW</p>
                            </div>
                            <div className="driverProfileCarFilledCardInformationNameCarEdit">
                                <p>Редактировать</p>
                            </div>
                        </div>
                        <div className="driverProfileCarFilledCardInformationCommon">
                            <div className="d-flex justify-content-between align-content-center">
                                <p>Тип автомобиля:</p>
                                <div className="d-flex">
                                    <div style={{ backgroundImage: "url(" + sedanIcon + ")" }} className="driverProfileCarFilledCardInformationCommonImg"></div>
                                    <p>Седан</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Тип топлива:</p>
                                <p>Бензин</p>
                            </div>
                            <div className="driverProfileCarFilledCardInformationComfort d-flex align-items-center justify-content-between">
                                <p>Удобства:</p>
                                <div className="driverProfileCarFilledCardInformationComfortImg d-flex align-items-center">
                                    {this.state.comfort.map((element, index) =>
                                        <img src={element.icon} width="18px" height="18px" title={element.title} alt="icon" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="driverProfileCarFilledCardInformationDeleteCar">Удалить автомобиль</p>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileCar = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileCarClass);

export default DriverProfileCar;