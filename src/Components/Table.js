import { useState } from 'react';
import Orders from './Orders.json';

const Table = () => {
    const [ascendingClick, setAscendingClick] = useState(false);
    const [descendingClick, setDescendingClick] = useState(false);
    const [array, setArray] = useState(Orders);
    const [outForDelivery, setOutForDelivery] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const [costRange, setCostRange] = useState(0);
    const [weightRange, setWeightRange] = useState(0);
    const [selectValue, setSelectValue] = useState('');
    const [sourceValue, setSourceValue] = useState('');

    const handleOrdersFiltering = (orders, filterOptions) => {
        return orders.filter(order => {
            if (filterOptions.costRange && order.cost > filterOptions.costRange) {
                return false;
            }
            if (filterOptions.weightRange && order.weight > filterOptions.weightRange) {
                return false;
            }
            if (filterOptions.outForDelivery && order.status !== 'out-for-delivery') {
                return false;
            }
            if (filterOptions.delivered && order.status !== 'delivered') {
                return false;
            }
            if (filterOptions.sourceValue && !order.source.toLowerCase().includes(filterOptions.sourceValue.toLowerCase())) {
                return false;
            }
            return true;
        });
    };

    const handleSorting = (orders, sortingOptions) => {
        if (sortingOptions.ascending) {
            return orders.sort((order1, order2) => order1.cost - order2.cost);
        } else if (sortingOptions.descending) {
            return orders.sort((order1, order2) => order2.cost - order1.cost);
        } else {
            return orders;
        }
    };

    const handleButtonClick = (options) => {
        const filteredOrders = handleOrdersFiltering(Orders, options.filterOptions);
        const sortedOrders = handleSorting(filteredOrders, options.sortingOptions);

        setArray(sortedOrders);
    };

    const outForDeliveryClick = () => {
        handleButtonClick({
            filterOptions: {
                costRange,
                weightRange,
                outForDelivery: true,
                delivered: false,
                sourceValue
            },
            sortingOptions: {
                ascending: ascendingClick,
                descending: descendingClick
            }
        });

        setOutForDelivery(true);
        setDelivered(false);
    };

    const deliveredClick = () => {
        handleButtonClick({
            filterOptions: {
                costRange,
                weightRange,
                outForDelivery: false,
                delivered: true,
                sourceValue
            },
            sortingOptions: {
                ascending: ascendingClick,
                descending: descendingClick
            }
        });

        setOutForDelivery(false);
        setDelivered(true);
    };

    const handleRangeChange = (rangeType, newRange) => {
        const filterOptions = {
            costRange,
            weightRange,
            outForDelivery,
            delivered,
            sourceValue
        };

        if (rangeType === 'cost') {
            setCostRange(newRange);
            filterOptions.costRange = newRange;
        } else if (rangeType === 'weight') {
            setWeightRange(newRange);
            filterOptions.weightRange = newRange;
        }

        handleButtonClick({
            filterOptions,
            sortingOptions: {
                ascending: ascendingClick,
                descending: descendingClick
            }
        });
    };

    const handleSourceValueChange = (e) => {
        const newSourceValue = e.target.value;
        setSourceValue(newSourceValue);

        handleButtonClick({
            filterOptions: {
                costRange,
                weightRange,
                outForDelivery,
                delivered,
                sourceValue: newSourceValue
            },
            sortingOptions: {
                ascending: ascendingClick,
                descending: descendingClick
            }
        });
    };

    const handleSelectChange = (e) => {
        const newSelectValue = e.target.value;
        setSelectValue(newSelectValue);

        if (newSelectValue === 'ascending') {
            handleButtonClick({
                filterOptions: {
                    costRange,
                    weightRange,
                    outForDelivery,
                    delivered,
                    sourceValue
                },
                sortingOptions: {
                    ascending: true,
                    descending: false
                }
            });

            setAscendingClick(true);
            setDescendingClick(false);
        } else if (newSelectValue === 'descending') {
            handleButtonClick({
                filterOptions: {
                    costRange,
                    weightRange,
                    outForDelivery,
                    delivered,
                    sourceValue
                },
                sortingOptions: {
                    ascending: false,
                    descending: true
                }
            });

            setAscendingClick(false);
            setDescendingClick(true);
        } else {
            handleButtonClick({
                filterOptions: {
                    costRange,
                    weightRange,
                    outForDelivery,
                    delivered,
                    sourceValue
                },
                sortingOptions: {
                    ascending: false,
                    descending: false
                }
            });

            setAscendingClick(false);
            setDescendingClick(false);
        }
    }

    const handleResetClick = () => {
        setArray(Orders);
        setAscendingClick(false);
        setDescendingClick(false);
        setOutForDelivery(false);
        setDelivered(false);
        setCostRange(0);
        setWeightRange(0);
        setSelectValue('');
        setSourceValue('');
    };

    return (
        <>
            <div className='px-4 sm:px-[10vw] mt-6 text-[1.3rem] text-center text-base'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                className='mr-2'
                                checked={outForDelivery}
                                onChange={outForDeliveryClick}
                            />
                            <label>Out for Delivery</label>
                        </div>
                        <div className='flex items-center ml-4'>
                            <input
                                type='checkbox'
                                className='mr-2'
                                checked={delivered}
                                onChange={deliveredClick}
                            />
                            <label>Delivered</label>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center mt-4 sm:mt-0'>
                        <div className='flex items-center'>
                            <label className='mr-2'>Cost Range</label>
                            <input
                                type='range'
                                min='0'
                                max='4000'
                                value={costRange}
                                onChange={(e) => handleRangeChange('cost', e.target.value)}
                            />
                            <span className='ml-2'>{costRange}</span>
                        </div>
                        <div className='flex items-center ml-4'>
                            <label className='mr-2'>Weight Range</label>
                            <input
                                type='range'
                                min='0'
                                max='20'
                                value={weightRange}
                                onChange={(e) => handleRangeChange('weight', e.target.value)}
                            />
                            <span className='ml-2'>{weightRange}</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row justify-between items-center mt-4'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <label className='mr-2'>Source</label>
                        <input className='bg-gray-200 rounded-full px-2'
                            type='text'
                            value={sourceValue}
                            placeholder='Enter source'
                            onChange={handleSourceValueChange}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row items-center mt-4 sm:mt-0'>
                        <label className='mr-2'>Sort By</label>
                        <select value={selectValue} onChange={handleSelectChange}>
                            <option value='none'>None</option>
                            <option value='ascending'>Ascending</option>
                            <option value='descending'>Descending</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='px-4 sm:px-[10vw] mt-6 text-center'>
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600'
                    onClick={handleResetClick}
                >
                    Remove Filters </button>

            </div>

            <div className='px-4 sm:px-[10vw] mt-6'>
                <table className='w-full my-10'>
                    <caption className='text-2xl font-bold pb-4'>Orders</caption>
                    <thead>
                        <tr className='border-b-2 border-black bg-slate-300'>
                            <th className='py-2'>User</th>
                            <th className='py-2'>Shipper</th>
                            <th className='py-2'>Weight</th>
                            <th className='py-2'>Cost</th>
                            <th className='py-2'>Source</th>
                            <th className='py-2'>Destination</th>
                            <th className='py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {array.map((order, index) => (
                            <tr key={index} className='border-b border-slate-400 bg-slate-100'>
                                <td className='py-2'>{order.user}</td>
                                <td className='py-2'>{order.shipper}</td>
                                <td className='py-2'>{order.weight}</td>
                                <td className='py-2'>{order.cost}</td>
                                <td className='py-2'>{order.source}</td>
                                <td className='py-2'>{order.destination}</td>
                                <td className='py-2'>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;