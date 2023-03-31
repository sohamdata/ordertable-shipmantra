import { useState } from 'react';

const AddOrderModal = ({ showModal, onClose, onAdd }) => {
    const [user, setUser] = useState('');
    const [shipper, setShipper] = useState('');
    const [cost, setCost] = useState(0);
    const [weight, setWeight] = useState(0);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = { user, shipper, cost, weight, source, destination, status };
        onAdd(newOrder);
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-auto ${showModal ? 'flex' : 'hidden'}  `}>
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            <div className="justify-center items-center flex fixed bg-white shadow-lg rounded-md">
                <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-medium">Add New Order</h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex items-center">
                            <div className="w-1/2 mr-4">
                                <label htmlFor="cost" className="block text-gray-700 font-medium mb-2">User</label>
                                <input type="text" className="form-input w-full" id="cost" value={user} onChange={(e) => setUser(e.target.value)} required />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">Shipping</label>
                                <input type="text" className="form-input w-full" id="weight" value={shipper} onChange={(e) => setShipper(e.target.value)} required />
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="w-1/2 mr-4">
                                <label htmlFor="cost" className="block text-gray-700 font-medium mb-2">Cost</label>
                                <input type="number" className="form-input w-full" id="cost" value={cost} onChange={(e) => setCost(e.target.value)} required />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">Weight</label>
                                <input type="number" className="form-input w-full" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="w-1/2 mr-4">
                                <label htmlFor="source" className="block text-gray-700 font-medium mb-2">Source</label>
                                <input type="text" className="form-input w-full" id="source" value={source} onChange={(e) => setSource(e.target.value)} required />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">Destination</label>
                                <input type="text" className="form-input w-full" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
                            <select className="form-select w-full" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="">Select Status</option>
                                <option value="out-for-delivery">out-for-delivery</option>
                                <option value="delivered">delivered</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOrderModal;
