export default function AdminUserPayment({ userOrders }) {
    let trElements = null;
    console.log(userOrders);
    if (userOrders) {
        trElements = Object.keys(userOrders).map((key) => {
            if (userOrders[key].length > 0) {
                return Object.keys(userOrders[key]).map((orderKey) => {
                    return (
                        <tr key={orderKey}>
                            <td>{userOrders[key][orderKey].user_id}</td>
                            <td>{userOrders[key][orderKey].payment_type}</td>
                            <td>
                                {new Date(userOrders[key][orderKey].date_purchase).toLocaleDateString()}
                            </td>
                            <td>
                                {userOrders[key][orderKey].total_facture}
                            </td>
                            <td>{userOrders[key][orderKey].bill_number}</td>
                            <td>{userOrders[key][orderKey].delivery}</td>
                        </tr>
                    );
                });
            }
        });
    }
    return (
        <>
            {trElements ? (
                <>
                    <h2>Achat Utilisateur</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id User</th>
                                <th>Type de paiement</th>
                                <th>Date d'achat</th>
                                <th>Montant total</th>
                                <th>N° Facture</th>
                                <th>Livreur</th>
                            </tr>
                        </thead>
                        <tbody>{trElements}</tbody>
                    </table>
                </>
            ) : null}
        </>
    );
}
