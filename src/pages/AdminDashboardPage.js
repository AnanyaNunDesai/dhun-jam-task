import React, { useEffect, useState } from "react"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"

const detailsURL = "https://stg.dhunjam.in/account/admin/4"

function AdminDashboard() {
    const [restoBarName, setRestoBarName] = useState('')
    const [restoBarLocation, setRestoBarLocation] = useState('')
    const [chargeOnRequest, setChargeOnRequest] = useState(false)
    const [customSongAmt, setCustomSongAmt] = useState(0)
    const [regularSongAmt, setRegularSongAmt] = useState([0, 0, 0, 0])
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
            display: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: '₹'
                }
            }
        }
    }
      
    const labels = [
        'Custom',
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4'
    ]

    // TODO: Implement PUT call for storing data 
    
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(detailsURL, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })

                if (response.ok) {
                    const json = await response.json()
                    const data = json.data

                    setRestoBarName(data['name'])
                    setRestoBarLocation(data['location'])
                    setChargeOnRequest(data['charge_customers'])
                    setCustomSongAmt(data['amount']['category_6'])
                    
                    const newRegularSongAmt = [
                        data['amount']['category_7'],
                        data['amount']['category_8'],
                        data['amount']['category_9'],
                        data['amount']['category_10']
                    ]
                    setRegularSongAmt(newRegularSongAmt)
                }
            } catch {
                console.error("An error occurred while fetching admin details.")
                return
            }
        }

        fetchAdminDetails()
    }, [])

    const regularSongAmtChanged = (idx, value) => {
        const newSongAmts = [...regularSongAmt]
        newSongAmts[idx] = value
        setRegularSongAmt(newSongAmts)
    }

    return (
        <div>
            <div className="h-screen m-10 flex flex-col justify-start items-center">
                <h1>{restoBarName}, {restoBarLocation} on Dhun Jam</h1>
                <div className="m-8 w-[600px] flex flex-row justify-center items-center gap-x-12">
                    <p>Do you want to charge your customers for requesting songs?</p>
                    <div className="flex items-center gap-x-3">
                    <input
                        id="charge-on-request1"
                        type="radio"
                        name="charge-on-request"
                        checked={chargeOnRequest}
                        onChange={() => setChargeOnRequest(true)}
                        className="w-4 h-4 text-green-500 border-green-500 focus:ring-0 focus:border-green-500"
                    />
                    <label htmlFor="charge-on-request1">Yes</label>
                    <input
                        id="charge-on-request2"
                        type="radio"
                        name="charge-on-request"
                        checked={!chargeOnRequest}
                        onChange={() => setChargeOnRequest(false)}
                        className="w-4 h-4 text-green-500 border-green-500 focus:ring-0 focus:border-green-500"
                    />
                    <label htmlFor="charge-on-request2">No</label>
                    </div>
                </div>
                <div className="m-8 w-[600px] flex flex-row justify-between items-center gap-x-12">
                    <p>Custom song request amount-</p>
                    <input className="h-10 w-[300px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white text-center" value={customSongAmt} onChange={(e) => setCustomSongAmt(e.target.value)} />
                </div>
                <div className="m-8 w-[600px] flex flex-row justify-between items-center gap-x-12">
                    <p>Regular song request amounts, from high to low-</p>
                    <div className="w-[300px] flex flex-row gap-x-4">
                        <input className="h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white" value={regularSongAmt[0]} onChange={(e) => regularSongAmtChanged(0, e.target.value)} />
                        <input className="h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white" value={regularSongAmt[1]} onChange={(e) => regularSongAmtChanged(1, e.target.value)} />
                        <input className="h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white" value={regularSongAmt[2]} onChange={(e) => regularSongAmtChanged(2, e.target.value)} />
                        <input className="h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white" value={regularSongAmt[3]} onChange={(e) => regularSongAmtChanged(3, e.target.value)} />
                    </div>
                </div>
                { chargeOnRequest ? <Bar
                    width="10%"
                    height="10%"
                    options={options}
                    data={{
                        labels: labels,
                        datasets: labels.map((label, idx) => {
                            return {
                                id: idx,
                                label: label,
                                data: regularSongAmt[idx],
                                backgroundColor: '#F0C3F1',
                            }
                        })
                      }}
                /> : null }
                <button onClick={() => {}} disabled={false} type="button" className="btn bg-buttonColor p-2 w-[600px] rounded-xl font-bold mt-3">
                    Save
                </button>
            </div>
        </div>
    )
}

export default AdminDashboard
