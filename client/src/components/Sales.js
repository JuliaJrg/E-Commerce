import React, { useState, useEffect } from "react"

function Sales() {
    const [allSale, setSales] = useState([])

    useEffect(() => {
        const getSales = async () => {
            let url = 'http://localhost:4242/sale/'
            const response = await fetch(url, { method: "get" })
            if (response.ok) {
                var data = await response.json()
                setSales(data)
            }
        }
        getSales()
    }, [])
    // console.log(allSale)
    return (
        <div className="sales-container">
            <div className="title-container">
                <h1>Promotions en cours</h1>
            </div>
            {allSale.map((sales) => {
                return (
                    <div className="card-sale">
                        <h4>{sales.name}</h4>
                    </div>
                )
            })}
        </div>
    )
}

export default Sales;
