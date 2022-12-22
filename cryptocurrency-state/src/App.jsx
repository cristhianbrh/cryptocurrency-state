import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"
import Coin_component from "./components/coins_components/Coin_component.jsx";
import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const App = () => {

    const [coinCurrent, setCoinCurrent] = new useState([]);
    const [coinsList, setCoinsList] = new useState([]);
    const [searchText, setSearchText] = new useState("");

    const canvaCoinCourrent_id = document.getElementById("canva_coin_current");

    const coinFilter = coinsList.filter((coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase()) | coin.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    const data = {
        labels: ['Red', 'Orange', 'Blue'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Popularity of colours',
                data: [55, 23, 96],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)'
                ],
                borderWidth: 1,
            }
        ]
    }
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Popularity of colours',
                data: [55, 23, 96],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)'
                ],
                borderWidth: 1,
            }
        ]
    });


    useEffect(() => {
        DefinecoinList();
        // DefineCanvaCoin();
    }, [])

    const DefinecoinList = async () => {
        const list = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1");
        setCoinsList(list.data);
        setCoinCurrent(list.data[0]);
    }

    const DefineCanvaCoin = () => {
        // var chartNew = new Chart(canvaCoinCourrent_id, {
        //      type: 'line',
        //      data:
        //      {
        //          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //          datasets: {
        //              label: '# votes',
        //              data: [12, 11, 11, 11, 1, 1],
        //              borderWidth: 1,
        //              fill: true,
        //              backgroundColor: 'rgb(115, 192, 192, .2)',
        //              borderColor: 'rgb(75, 192, 192)',
        //              tension: 0
        //          }

        //      }
        //  });

        const ror = new Chart(canvaCoinCourrent_id, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
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
                    <Line id="canva_coin_current" data={chartData}></Line>
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
