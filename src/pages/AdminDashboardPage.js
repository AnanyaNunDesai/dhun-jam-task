import React, { useEffect, useState } from "react"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"

const detailsURL = "https://stg.dhunjam.in/account/admin/4"

function AdminDashboard() {
    const [restoBarName, setRestoBarName] = useState("")
    const [restoBarLocation, setRestoBarLocation] = useState("")
    const [chargeOnRequest, setChargeOnRequest] = useState(false)
    const [customSongAmt, setCustomSongAmt] = useState(0)
    const [regularSongAmt, setRegularSongAmt] = useState([0, 0, 0, 0])

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(detailsURL, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                })

                if (response.ok) {
                    const json = await response.json()
                    const data = json.data

                    setRestoBarName(data["name"])
                    setRestoBarLocation(data["location"])
                    setChargeOnRequest(data["charge_customers"])
                    setCustomSongAmt(data["amount"]["category_6"])

                    const newRegularSongAmt = [
                        data["amount"]["category_7"],
                        data["amount"]["category_8"],
                        data["amount"]["category_9"],
                        data["amount"]["category_10"]
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

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const adjustedGraph = {
        id: 'adjustedGraph',
        beforeLayout: (chart, args, opts) => {
          const {
            display,
            font
          } = opts
          if (!display) {
            return
          }
      
          const {
            ctx
          } = chart
          ctx.font = font || '40px "Poppins", sans-serif'
      
          const {
            width
          } = ctx.measureText(opts.text)
          chart.options.layout.padding.left = width * 2.5
    
        },
        afterDraw: (chart, args, opts) => {
            const { font, text, color } = opts
            const { ctx,
                chartArea: {
                    top,
                    bottom
                }
            } = chart

            ctx.fillStyle = color || "#FFFFFF"
            ctx.font = font || '40px "Poppins",  sans-serif'
            ctx.fillText(text, 0, (top + bottom) / 8)
        }
      }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                display: false
            },
            adjustedGraph: {
                display: true,
                text: "₹",
                color: "#FFFFFF"
            }
        },
        scales: {
            x: {
                grid: {
                    color: "#FFFFFF",
                    drawOnChartArea: false,
                    drawBorder: true,
                    lineWidth: 1
                }
            },
            y: {
                grid: {
                    color: "#FFFFFF",
                    drawOnChartArea: false,
                    lineWidth: 1,
                    drawBorder: true
                },
                ticks: {
                    display: false
                }
            }
        }
    }

    const labels = [
        "Custom",
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4"
    ]

    const minimumCustomSongAmt = 99
    const minimumRegularSongAmt = [79, 59, 39, 19]

    const storeAdminDetails = async () => {
        try {
            const detailsValues = {
                "amount": {
                    "category_6": customSongAmt,
                    "category_7": regularSongAmt[0],
                    "category_8": regularSongAmt[1],
                    "category_9": regularSongAmt[2],
                    "category_10": regularSongAmt[3]
                }
            }

            const response = await fetch(detailsURL, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(detailsValues)
            })

            if (!response.ok) {
                console.error("The server was unable to accept the admin detail specifications.")
            }
        } catch (e) {
            console.error("An error occurred while attempting to store admin details.")
        }
    }

    const regularSongAmtChanged = (idx, value) => {
        const newSongAmts = [...regularSongAmt]
        newSongAmts[idx] = value
        setRegularSongAmt(newSongAmts)
    }

    const checkIfSaveDisabled = () => {
        if (!chargeOnRequest || customSongAmt < minimumCustomSongAmt) {
            return true
        } else {
            for (let i = 0; i < minimumRegularSongAmt.length; i++) {
                if (regularSongAmt[i] < minimumRegularSongAmt[i]) {
                    return true
                }
            }

            return false
        }
    }

    return (
        <div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
            </style>
            <div className="h-screen m-10 flex flex-col justify-start items-center">
                <h1 className="font-poppins font-bold">{restoBarName}, {restoBarLocation} on Dhun Jam</h1>
                <div className="m-8 w-[600px] flex flex-row items-center gap-x-32">
                    <p className="font-poppins font-normal">Do you want to charge your <br /> customers for requesting songs?</p>
                    <div className="flex items-center gap-x-3">
                        <input
                            id="charge-on-request1"
                            type="radio"
                            name="charge-on-request"
                            checked={chargeOnRequest}
                            onChange={() => setChargeOnRequest(true)}
                            className="w-4 h-4 accent-[#6741D9] checked:bg-emerald-400 checked:hover:bg-emerald-400 checked:active:bg-emerald-400 checked:focus:bg-emerald-400 focus:bg-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                        <label htmlFor="charge-on-request1" className="font-poppins">Yes</label>
                        <input
                            id="charge-on-request2"
                            type="radio"
                            name="charge-on-request"
                            checked={!chargeOnRequest}
                            onChange={() => setChargeOnRequest(false)}
                            className="w-4 h-4 accent-[#6741D9] bg-green-500 border-green-500 focus:ring-0 focus:border-green-500 checked:border-green-500 checked:before:bg-green-500"
                        />
                        <label htmlFor="charge-on-request2" className="font-poppins">No</label>
                    </div>
                </div>
                <div className="m-8 w-[600px] flex flex-row justify-between items-center gap-x-12">
                    <p className="font-poppins font-normal">Custom song request amount-</p>
                    <input disabled={!chargeOnRequest} className="h-10 w-[300px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white text-center disabled:border-disabled disabled:text-disabled font-poppins" value={customSongAmt} onChange={(e) => setCustomSongAmt(e.target.value)} />
                </div>
                <div className="m-8 w-[600px] flex flex-row justify-between items-center gap-x-12">
                    <p className="font-poppins font-normal">Regular song request amounts, from high to low-</p>
                    <div className="w-[300px] flex flex-row gap-x-4">
                        <input disabled={!chargeOnRequest} className="font-poppins font-light h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white disabled:border-disabled disabled:text-disabled" value={regularSongAmt[0]} onChange={(e) => regularSongAmtChanged(0, e.target.value)} />
                        <input disabled={!chargeOnRequest} className="font-poppins font-light h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white disabled:border-disabled disabled:text-disabled" value={regularSongAmt[1]} onChange={(e) => regularSongAmtChanged(1, e.target.value)} />
                        <input disabled={!chargeOnRequest} className="font-poppins font-light h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white disabled:border-disabled disabled:text-disabled" value={regularSongAmt[2]} onChange={(e) => regularSongAmtChanged(2, e.target.value)} />
                        <input disabled={!chargeOnRequest} className="font-poppins font-light h-10 w-[60px] bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white disabled:border-disabled disabled:text-disabled" value={regularSongAmt[3]} onChange={(e) => regularSongAmtChanged(3, e.target.value)} />
                    </div>
                </div>
                {chargeOnRequest ? <div className="w-[600px] h-[600px] mt-10 mb-0">
                    <Bar
                        options={options}
                        plugins={[adjustedGraph]}
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Regular Songs Requested',
                                    data: [customSongAmt, ...regularSongAmt],
                                    backgroundColor: '#F0C3F1',
                                    barThickness: 20,
                                    color: '#FFFFFF',
                                    borderRadius: 5
                                },
                            ],
                        }}
                        className="text-white m-0 p-0"
                    />
                </div> : null}
                <div>
                    <button onClick={storeAdminDetails} disabled={checkIfSaveDisabled()} type="button" className="btn bg-buttonColor mt-0 p-2 w-[600px] rounded-xl font-bold disabled:border-disabled disabled:text-disabled">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
