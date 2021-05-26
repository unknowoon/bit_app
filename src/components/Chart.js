
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './plusminus.css';
// <TableCell>전일비 변동가</TableCell>
// <TableCell>{compare24H(data.FluctateRate, data.FluctateRate24)}</TableCell>

//getCoinName(coinNameKR.name, data.key)
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const getCoinName = (key, val) => {
    if (key[val]) {
        return key[val]
    } else {
        return val
    };
};

const compare24H = (f, f24) => {
    if (f < 0) {
        return (
            <div className="minus">
                {fetch}% ({f24}원)
            </div>
        );
    } else if (f >= 0) {
        return (
            <div className="plus">
                +{f}% (+{f24}원)
            </div>
        );
    }
}

const premiumCal = (p, gap) => {
    if (p < 0) {
        return (<span>
            <div className="minus">
                {p}%
            </div>
            <div className="minus">
                ({gap}원)
            </div>
        </span>
        );
    } else {
        return (
            <span>
                <div className="plus">
                    +{p}%
            </div>
                <div className="plus">
                    (+{gap}원)
            </div>
            </span>
        );
    }
}

export default function Chart({ data }) {
    const classes = useStyles();
    return (
        <React.Fragment>

            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>현재가</TableCell>

                        <TableCell>K-프리미엄</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data) => (
                        <TableRow key={data.key}>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.Price}</TableCell>

                            <TableCell>{premiumCal(data.premium, data.premiumGap)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}