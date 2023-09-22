const Alert = ({alerte}) => {
    return ( <>
        { Object.keys(alerte).length > 0 && <div className={`alert alert-${alerte.type} mt-3`}>
            {alerte.liste.map((a, index) => {
                return <div key={index}>{a}</div>
            })}
        </div>}
    </> );
}
 
export default Alert;