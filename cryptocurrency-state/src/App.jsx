import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"
import Coin_component from "./components/coins_components/Coin_component.jsx";
import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const App = () => {

    var x = false;
    const [coinCurrent, setCoinCurrent] = new useState([]);
    const [coinsList, setCoinsList] = new useState([]);
    const [searchText, setSearchText] = new useState("");
    const [historicCanvaData, setHistoricCanvaData] = new useState([]);
    const [listCanva, setListCanva] = new useState([]);

    const coinFilter = coinsList.filter((coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase()) | coin.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    const [chartData, setChartData] = useState({
        type: 'line',
        labels: ["1", "2"],
        datasets: [
            {
                label: '# votes',
                data: [12, 11, 11, 11, 1, 1],
                borderWidth: 2,
                fill: true,
                tension: 0,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(115, 192, 192, .2)'
            }
        ]
    });


    useEffect(() => {
        if (!x) {
            DefinecoinList();
            DefineCanvaHistoricList();
            x = true;
        }

    }, [])

    const DefinecoinList = async () => {
        const list = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1");
        setCoinsList(list.data);
        setCoinCurrent(list.data[0]);
    }

    const DefineCanvaHistoricList = async () => {
        // const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const listFull = await axios.get("https://api.coingecko.com/api/v3/coins/" + ((coinCurrent.length == 0) ? "bitcoin" : coinCurrent.id) + "/market_chart?vs_currency=usd&days=10");
        

        setHistoricCanvaData(listFull.data);
        const lol = listFull.data;
        console.log(lol.prices);

        var numberAct = -1;
        lol.prices.forEach((elementPrices) => {
            
            var time = new Date(elementPrices[0]);
            console.log(time.toString());
            if (numberAct != time.getDay()) {
                listCanva.push(elementPrices);

                numberAct = time.getDay();
            }
        });
        setChartData(reloadCanva());
    }
    const labelsCanva = (it_label_data)=>{ //it_label_data:    (0:labels)|(1:data)
        const labeln = [];
        
        
        if(it_label_data == 0)
        {
            listCanva.forEach((canvaItem)=>{
                var getDayCanva = new Date(canvaItem[it_label_data]);
                labeln.push((getDayCanva.getDay()+1) + "-" + (getDayCanva.getMonth()+1) + "-"+ getDayCanva.getFullYear());
            });
        }else if(it_label_data == 1)
        {
            listCanva.forEach((canvaItem)=>{
                labeln.push(canvaItem);
            });
        }


        return labeln;
    }
    const reloadCanva = () => {
        return {
            type: 'line',
            labels: labelsCanva(0),
            datasets: [
                {
                    label: '# votes',
                    data: labelsCanva(1),
                    borderWidth: 2,
                    fill: true,
                    tension: 0,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(115, 192, 192, .2)'
                }
            ]
        }
    }

    return (
        <>
            <div id="superid">
                <div className="coin_actual">
                    <img src={coinCurrent.image} alt="No image" />
                    <p>{coinCurrent.name}</p>
                    <span>( {coinCurrent.symbol} )</span>
                </div>
                <div className="coin_current_description">
                    <Line id="canva_coin_current" className="canvaCoin_current" data={chartData} width="700" ></Line>
                    <span>+12</span>
                    <span>-11</span>
                    <span></span>
                </div>
                <hr />
                <div className="coins">
                    <input className="form-control item" placeholder="Moneda" onChange={e => { setSearchText(e.target.value) }} />
                    <div className="list_coins">
                        <table className="text-nowrap table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Moneda</th>
                                    <th>Precio</th>
                                    <th>Precio cambiando</th>
                                    <th>24h volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coinFilter.map((coin, index) => (
                                        <Coin_component
                                            index={index} coin={coin} key={index} />
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default App;
