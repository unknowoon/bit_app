import React from 'react';
import { coinNameKR } from './coinName';
import axios from 'axios';
import Chart from './Chart';
import Loading from "./Loading";
import SearchBar from './Searchbar';
// <Input onChange={handleInput} />
const addComma = (num) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
};

const getCoinName = (key, val) => {
    if (key[val]) {
        return key[val]
    } else {
        return val
    };
};

class CoinChart extends React.Component {
    state = {
        isLoading: true,
        data: [],
        inputData: ""
    };
    async componentDidMount() {
        /* Exchange Rate USD to KRW */
        const exchangeResponse = await axios.get(
            `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`
        );
        const exchangeData = exchangeResponse.data[0].basePrice;
        this.getCoinData(exchangeData); // Initial get coin Data
        this.interval = setInterval(() => {
            this.getCoinData(exchangeData);
        }, 5000); // Interval 5 Seconds
    }

    async getCoinData(exchangeData) {
        const chartData = []; //  Initial chart array
        const response = await axios.get(
            `https://api.bithumb.com/public/ticker/all`
        );
        const usdCoinData = await axios.get(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,DOGE,ETH,DASH,LTC,ETC,XRP,BCH,XMR,ZEC,QTUM,BTG,EOS,ICX,VET,TRX,ELF,MITH,MCO,OMG,KNC,GNT,ZIL,ETHOS,PAY,WAX,POWR,LRC,GTO,STEEM,STRAT,ZRX,REP,AE,XEM,SNT,ADA,PPT,CTXC,CMT,THETA,WTC,ITC,TFUEL,CRO,LF,CHR,MBL,MXC,DVP,FCT,FNB,TRV,PCM,DAD,AOA,WOM,SOC,EM,QBZ,BOA,FLETA,SXP,COS,APIX,EL,BASIC,HIVE,XPR,FIT,EGG,BORA,ARPA,APM,CKB,AERGO,ANW,CENNZ,EVZ,MCI,SRM,RLC,SAND,CVT,BURGER,LPT,MKR,COMP,AAVE,YFI,UMA,UNI,QTCON,LAMB,TRUE,ABT,RNT,PLY,WAVES,LINK,ENJ,PST,SALT,RDN,LOOM,PIVX,INS,BCD,BZNT,XLM,OCN,BSV,TMTG,BAT,WET,XVG,IOST,POLY,HC,ROM,AMO,ETZ,ARN,APIS,MTL,DACC,DAC,BHP,BTT,HDAC,NPXS,AUTO,GXC,ORBS,VALOR,CON,GLM,WAXP,QKC,STRAX,ANKR,MIX&tsyms=USD`
        );

        /* If API Status Success */
        if (response.data.status === '0000') {
            delete response.data.data['date']; // Remove 'date' data from object

            /* Create table data */
            for (let [key, value] of Object.entries(response.data.data)) {
                let premiumPrice, premiumPriceGap;
                if (typeof usdCoinData.data.DISPLAY[key] === 'undefined') {
                    // If Coin data not exists set '-'
                    premiumPrice = premiumPriceGap = '-';
                } else {
                    /* Calculate USD * KRW data */
                    let usdPrice =
                        usdCoinData.data.DISPLAY[key].USD.PRICE.replace('$ ', '').replace(
                            ',',
                            ''
                        ) * exchangeData;
                    premiumPrice = (
                        ((value.closing_price - usdPrice) / usdPrice) *
                        100
                    ).toFixed(2);
                    premiumPriceGap = (value.closing_price - usdPrice).toFixed(2);
                }

                /* Create Final Data */
                chartData.push({
                    key: key,
                    name: getCoinName(coinNameKR.name, key),
                    Price: `${addComma(value.closing_price)}원`,
                    FluctateRate: `${value['fluctate_rate_24H']}`,
                    FluctateRate24: `${value['fluctate_24H']}`,
                    premium: addComma(premiumPrice),
                    premiumGap: addComma(premiumPriceGap),
                });
            }
            /* If Server Status Success */
            this.setState({
                isLoading: false,
                data: chartData,
            });
        };
    }

    handleInput = (e) => {
        this.setState({
            inputData: e.target.value,
        });
    };

    render() {
        const { isLoading } = this.state;
        const { handleInput } = this;
        const filtered = this.state.data.filter((data) => {
            return data.name.toLowerCase().includes(this.state.inputData)
        });
        const sorted = this.state.data.sort(function (a, b) {
            return b.premium - a.premium;
        });

        return (
            <div>
                {isLoading
                    ? (
                        <Loading />
                    ) : (
                        <div>
                            <SearchBar handleChange={handleInput} />

                            <Chart data={filtered} />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default CoinChart;