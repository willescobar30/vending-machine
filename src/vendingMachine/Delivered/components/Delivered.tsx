import React, { Dispatch, FC, SetStateAction } from 'react';
interface DeliveredProps {
    setDelivered: Dispatch<SetStateAction<IDelivered[]>>,
    delivered: IDelivered[]
}

interface IDelivered {
    id: string,
    name: string,
    preparation_time: number,
    thumbnail: string,
}

const Delivered: FC<DeliveredProps> = ({ setDelivered, delivered }) => {
    if (delivered.length !== 0) {
        return (
            <div style={{ width: '100%' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th align="left" style={{ width: '10%' }}>Name</th>
                            <th style={{ width: '45%' }}>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {delivered && delivered.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td align="left">{item.name}</td>
                                    <td><img src={item.thumbnail} alt={item.name} width="100px" height="100px" /></td>
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

export default Delivered;