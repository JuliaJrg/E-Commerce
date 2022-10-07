export default function AdminUserReview({ userReviews }) {
    let trElements = null;
    if (userReviews) {
        trElements = Object.keys(userReviews).map((key) => {
            if (userReviews[key].length > 0) {
                return Object.keys(userReviews[key]).map((reviewKey) => {
                    return (
                        <tr key={reviewKey}>
                            <td>{userReviews[key][reviewKey].user_id}</td>
                            <td>{userReviews[key][reviewKey].product_id}</td>
                            <td>{userReviews[key][reviewKey].nbr_stars}</td>
                            <td>{userReviews[key][reviewKey].comment}</td>
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
                    <h2>Revues Utilisateur</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id User</th>
                                <th>Id Produit</th>
                                <th>Étoiles</th>
                                <th>Commentaires</th>
                            </tr>
                        </thead>
                        <tbody>{trElements}</tbody>
                    </table>
                </>
            ) : null}
        </>
    );
}
