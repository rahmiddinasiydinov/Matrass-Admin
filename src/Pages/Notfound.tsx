import './Pages.scss';


export const Notfound: React.FC = () => {
    return (
        <div className="notfound">
            <h2 className="notfound__title">404</h2>
            <p className="notfound__text">Page is not found</p>
            <button className='notfound__btn' onClick={() => {
                window.history.back();
            }}>Back</button>
        </div>
    )
}
    



