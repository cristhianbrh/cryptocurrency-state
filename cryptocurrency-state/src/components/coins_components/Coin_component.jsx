const Coin_component = ({index, coin}) => {
    return (
        <tr>    
            <th>{index}</th>
            <th className="coin_name_ico">
                <img src={coin.image} alt="." />
                <span>{coin.name}</span>    
                <span>({coin.symbol})</span>
            </th>
            <th>{coin.current_price}</th>
            <th className={(coin.price_change_percentage_24h<0)?"text-danger":"text-success"    }>{coin.price_change_percentage_24h}</th>
            <th>{coin.total_volume}</th>
        </tr>
    )
}
export default Coin_component;

