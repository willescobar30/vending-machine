import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface WaitingProps {
    setWaiting: Dispatch<SetStateAction<IData[]>>,
    waiting: IData[],
    setDelivered: Dispatch<SetStateAction<IDelivered[]>>,
    delivered: IDelivered[],
}

interface IData {
    id: string,
    name: string,
    preparation_time: number,
    thumbnail: string,
    created_at: Date
}

interface IDelivered {
    id: string,
    name: string,
    preparation_time: number,
    thumbnail: string,
}


const Waiting: FC<WaitingProps> = ({ setWaiting, waiting, setDelivered, delivered }) => {
    const [timeOver, setTimeOver] = useState<number>(0);

    useEffect(() => {

        const handleDeliveredProduct = (id: string) => {
            const deliveredList = delivered
            const item_id = waiting.filter(item => item.id === id)[0].id;
            const item_name = waiting.filter(item => item.id === id)[0].name;
            const item_preparation_time = waiting.filter(item => item.id === id)[0].preparation_time;
            const item_thumbnail = waiting.filter(item => item.id === id)[0].thumbnail;
            deliveredList.push({
                id: item_id,
                name: item_name,
                preparation_time: item_preparation_time,
                thumbnail: item_thumbnail
            })
            setTimeOver(0);
            const currentList = waiting.filter((item, index) => index > 0);
            setWaiting(currentList);
            setDelivered(deliveredList);


        }
        const interval = setInterval(() => {
            if (waiting.length > 0) {
                setTimeOver(Math.round(new Date().getTime() / 1000) - Math.round(waiting[0].created_at.getTime() / 1000));
                if (timeOver >= waiting[0].preparation_time) {
                    handleDeliveredProduct(waiting[0].id);
                }
            }
        });

        return () => clearInterval(interval);

    }, [timeOver, waiting, delivered, setWaiting, setDelivered]);

    if (waiting.length !== 0) {
        return (
            <div style={{ width: '100%' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th align="left" style={{ width: '10%' }}>Name</th>
                            <th style={{ width: '45%' }}>Image</th>
                            <th style={{ width: '45%' }}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waiting && waiting.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td align="left">{item.name}</td>
                                    <td><img src={item.thumbnail} alt={item.name} width="100px" height="100px" /></td>
                                    <td>{item.preparation_time}</td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>);
    } else {
        return <h1>Loading ...</h1>
    }
}

export default Waiting;